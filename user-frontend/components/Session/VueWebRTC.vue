<template>
  <div class="video-list">
    <div
      v-for="item in videoList"
      :key="item.id"
      :video="item"
      class="video-item"
    >
      <video
        v-if="!item.isLocal"
        :id="item.id"
        ref="videos"
        controls
        autoplay
        playsinline
        :height="cameraHeight"
        :muted="item.muted"
      ></video>
      <v-container
        v-else-if="videoList && videoList.length === 1"
        fill-height
        style="height: 160px"
      >
        <v-row align="center" justify="center" height="160">
          <p class="my-auto">Awaiting for your partner to join...</p>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import SimpleSignalClient from "simple-signal-client";

export default {
  name: "VueWebrtc",
  components: {},
  props: {
    roomId: {
      type: String,
      default: "public-room-v2",
    },
    socketURL: {
      type: String,
      default: `http://localhost:3007`,
    },
    cameraHeight: {
      type: [Number, String],
      default: 160,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    screenshotFormat: {
      type: String,
      default: "image/jpeg",
    },
    enableAudio: {
      type: Boolean,
      default: true,
    },
    enableVideo: {
      type: Boolean,
      default: true,
    },
    enableLogs: {
      type: Boolean,
      default: false,
    },
    peerOptions: {
      type: Object, // NOTE: use these options: https://github.com/feross/simple-peer
      default() {
        return {
          config: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
            ],
          },
        };
      },
    },
    deviceId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      signalClient: null,
      videoList: [],
      canvas: null,
      socket: null,
    };
  },
  methods: {
    async join() {
      var that = this;
      this.log("join");
      this.socket = this.$nuxtSocket({
        name: "video-chat",
        path: "/video-chat/new",
        reconnection: true,
        withCredentials: true,
      });

      this.signalClient = new SimpleSignalClient(this.socket);
      let constraints = {
        video: that.enableVideo,
        audio: that.enableAudio,
      };
      if (that.deviceId && that.enableVideo) {
        constraints.video = { deviceId: { exact: that.deviceId } };
      }
      const localStream = await navigator.mediaDevices.getUserMedia(
        constraints,
      );
      this.log("opened", localStream);
      this.joinedRoom(localStream, true);
      this.signalClient.once("discover", (discoveryData) => {
        that.log("discovered", discoveryData);
        async function connectToPeer(peerID) {
          if (peerID == that.socket.id) return;
          try {
            that.log("Connecting to peer");
            const { peer } = await that.signalClient.connect(
              peerID,
              that.roomId,
              that.peerOptions,
            );
            that.videoList.forEach((v) => {
              if (v.isLocal) {
                that.onPeer(peer, v.stream);
              }
            });
          } catch (e) {
            that.log("Error connecting to peer");
          }
        }
        discoveryData.peers.forEach((peerID) => connectToPeer(peerID));
        that.$emit("opened-room", that.roomId);
      });
      this.signalClient.on("request", async (request) => {
        that.log("requested", request);
        const { peer } = await request.accept({}, that.peerOptions);
        that.log("accepted", peer);
        that.videoList.forEach((v) => {
          if (v.isLocal) {
            that.onPeer(peer, v.stream);
          }
        });
      });
      this.signalClient.discover(that.roomId);
    },
    onPeer(peer, localStream) {
      var that = this;
      that.log("onPeer");
      peer.addStream(localStream);
      peer.on("stream", (remoteStream) => {
        that.joinedRoom(remoteStream, false);
        peer.on("close", () => {
          var newList = [];
          that.videoList.forEach(function (item) {
            if (item.id !== remoteStream.id) {
              newList.push(item);
            }
          });
          that.videoList = newList;
          that.$emit("left-room", remoteStream.id);
        });
        peer.on("error", (err) => {
          that.log("peer error ", err);
        });
      });
    },
    joinedRoom(stream, isLocal) {
      var that = this;
      let found = that.videoList.find((video) => {
        return video.id === stream.id;
      });
      if (found === undefined) {
        let video = {
          id: stream.id,
          muted: isLocal,
          stream: stream,
          isLocal: isLocal,
        };
        that.videoList.push(video);
      }
      setTimeout(function () {
        for (var i = 0, len = that.$refs.videos.length; i < len; i++) {
          if (that.$refs.videos[i].id === stream.id) {
            that.$refs.videos[i].srcObject = stream;
            break;
          }
        }
      }, 500);
      that.$emit("joined-room", stream.id);
    },
    leave() {
      this.videoList.forEach((v) =>
        v.stream.getTracks().forEach((t) => t.stop()),
      );
      this.videoList = [];
      this.signalClient.peers().forEach((peer) => peer.removeAllListeners());
      this.signalClient.destroy();
      this.signalClient = null;
      this.socket.destroy();
      this.socket = null;
    },
    capture() {
      return this.getCanvas().toDataURL(this.screenshotFormat);
    },
    getCanvas() {
      let video = this.$refs.videos[0];
      if (video !== null && !this.ctx) {
        let canvas = document.createElement("canvas");
        canvas.height = video.clientHeight;
        canvas.width = video.clientWidth;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
      }
      const { ctx, canvas } = this;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas;
    },
    async shareScreen() {
      var that = this;
      if (navigator.mediaDevices == undefined) {
        that.log("Error: https is required to load cameras");
        return;
      }
      try {
        var screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });
        this.joinedRoom(screenStream, true);
        that.$emit("share-started", screenStream.id);
        that.signalClient.peers().forEach((p) => that.onPeer(p, screenStream));
      } catch (e) {
        that.log("Media error: " + JSON.stringify(e));
      }
    },
    log(message, data) {
      if (this.enableLogs) {
        console.log(message);
        if (data != null) {
          console.log(data);
        }
      }
    },
  },
};
</script>
