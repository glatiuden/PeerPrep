resource "aws_elasticache_parameter_group" "redis" {
  name        = "redis-cluster-parameter-group-peerprep"
  family      = "redis5.0"
  description = "Redis default cluster parameter group"
}

resource "aws_elasticache_cluster" "redis_question" {
  cluster_id           = "redis-question-cluster"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = aws_elasticache_parameter_group.redis.name
  engine_version       = "5.0.5"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis_cluster.id]
  availability_zone    = data.aws_availability_zones.available.names[0]
}

resource "aws_elasticache_cluster" "redis_match" {
  cluster_id           = "redis-match-cluster"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = aws_elasticache_parameter_group.redis.name
  engine_version       = "5.0.5"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis_cluster.id]
  availability_zone    = data.aws_availability_zones.available.names[0]
}

resource "aws_elasticache_cluster" "redis_chat" {
  cluster_id           = "redis-chat-cluster"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = aws_elasticache_parameter_group.redis.name
  engine_version       = "5.0.5"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis_cluster.id]
  availability_zone    = data.aws_availability_zones.available.names[0]
}

resource "aws_elasticache_cluster" "redis_editor" {
  cluster_id           = "redis-editor-cluster"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = aws_elasticache_parameter_group.redis.name
  engine_version       = "5.0.5"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis_cluster.id]
  availability_zone    = data.aws_availability_zones.available.names[0]
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "redis-cache-subnet"
  subnet_ids = aws_subnet.main[*].id
}

resource "aws_security_group" "redis_cluster" {
  name        = "redis-cluster"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "redis-cluster"
  }
}