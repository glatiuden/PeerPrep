resource "aws_iam_role" "main-cluster" {
  name = "terraform-eks-main-cluster"

  assume_role_policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Federated: "arn:aws:iam::694217600744:oidc-provider/oidc.eks.ap-southeast-1.amazonaws.com/id/BE2F637E42B40198C6AAAD03B9801D44"
        },
        Action: "sts:AssumeRoleWithWebIdentity",
        Condition: {
          StringEquals: {
            "oidc.eks.ap-southeast-1.amazonaws.com/id/BE2F637E42B40198C6AAAD03B9801D44:aud": "sts.amazonaws.com",
            "oidc.eks.ap-southeast-1.amazonaws.com/id/BE2F637E42B40198C6AAAD03B9801D44:sub": "system:serviceaccount:kube-system:alb-ingress-controller"
          }
        }
      },
      {
        Action: "sts:AssumeRole"
        Effect: "Allow",
        Principal: {
          Service: "eks.amazonaws.com"
        },
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "main-cluster-AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.main-cluster.name
}

resource "aws_iam_role_policy_attachment" "main-cluster-AmazonALB" {
  policy_arn = "arn:aws:iam::694217600744:policy/ALBIngressControllerIAMPolicy"
  role       = aws_iam_role.main-cluster.name
}

resource "aws_security_group" "main-cluster" {
  name        = "terraform-eks-main-cluster"
  description = "Cluster communication with worker nodes"
  vpc_id      = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "terraform-eks-main"
  }
}

resource "aws_security_group_rule" "main-cluster-ingress-workstation-https" {
  cidr_blocks       = [local.workstation-external-cidr]
  description       = "Allow workstation to communicate with the cluster API Server"
  from_port         = 443
  protocol          = "tcp"
  security_group_id = aws_security_group.main-cluster.id
  to_port           = 443
  type              = "ingress"
}

resource "aws_eks_cluster" "main" {
  name     = var.cluster-name
  role_arn = aws_iam_role.main-cluster.arn

  vpc_config {
    security_group_ids = [aws_security_group.main-cluster.id]
    subnet_ids         = aws_subnet.main[*].id
  }

  depends_on = [
    aws_iam_role_policy_attachment.main-cluster-AmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.main-cluster-AmazonALB,
  ]
}
