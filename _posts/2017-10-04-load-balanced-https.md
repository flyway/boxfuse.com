---
layout: blog
subtitle: "Introducing load-balanced-https apps"
permalink: /blog/load-balanced-https.html
---
Boxfuse originally launched with two types of apps: `single-instance` for applications using Elastic IP addresses
and `load-balanced` for applications using Classic Elastic Load Balancers. Over time we have added support for additional
types of applications such as [`workers apps`](/blog/worker) and [`one-off apps`](/blog/one-off) to support more diverse
types of workloads.

Today Boxfuse is expanding further with support for `load-balanced-https` apps using **AWS Application Load Balancers**,
together with Auto Scaling Groups and optionally custom domains and TLS (SSL) certificates.

![load-balanced-https](/assets/posts/load-balanced-https/load-balanced-https.png)

## How does it work?

When you create a new `load-balanced-https` app using either the [Boxfuse Console](https://console.boxfuse.com)

![create](/assets/posts/load-balanced-https/console.png){: .screenshot}

or the [Boxfuse Client](/docs/commandline)

<pre class="console"><span>&gt;</span> boxfuse create my-app <strong>-app.type=load-balanced-https</strong></pre>

Boxfuse will be set up to automatically provision and configure all necessary resources when the app is deployed.

Just for the ALB this includes:
- a new ALB (Application Load Balancer)
- a security group with the correct permissions for the ALB
- one or more listeners for the correct ports on the ALB
- a target group associated with the ALB
- rules connecting the listeners to the target group

## Why Application Load Balancers?

AWS Application Load Balancers come with a number of important improvements for applications serving traffic over HTTP(S)
including **HTTP/2** and **WebSockets**, while building on the important features you already love like
Auto Scaling and automatic TLS certificate management. 

## Seeing it in action

So let's see how this works if we deploy our sample Spring Boot application on AWS:

<pre class="console" style="font-size: 90%"><span>&gt;</span> boxfuse run -app.type=load-balanced-https -env=test -tls.type=acm -domain=hello.boxfuse-example.com

Creating hello ...
<strong class="success">Successfully created app hello (type: load-balanced-https, tls: acm, db: none, logs: cloudwatch-logs)</strong>
Fusing Image for hello.jar (Spring Boot) ...
Image fused in 00:03.673s (62850 K) -> myuser/hello:1.0
Pushing myuser/hello:1.0 ...
Verifying myuser/hello:1.0 ...
Waiting for AWS to create an encrypted AMI for myuser/hello:1.0 in eu-central-1 (this may take up to 50 seconds) ...
AMI created in 00:47.010s in eu-central-1 -> ami-75de631a
Creating security group boxsg-myuser-test-hello ...
Creating Log Stream boxfuse/test > myuser/hello ...
Creating Application Load Balancer for myuser/hello in test ...
Creating Target Group myuser-test-hello ...
Found certificate for hello.boxfuse-example.com => arn:aws:acm:eu-central-1:...
Creating ALB Listener for port 80 ...
Creating security group boxsg-myuser-test-hello-1.0 ...
Creating Launch Configuration boxlc-myuser-test-hello-1.0 ...
Creating Auto Scaling Group boxasg-myuser-test-hello-1.0 ...
Waiting for Auto Scaling Group boxasg-myuser-test-hello-1.0 to launch 1 t2.micro Instance ...
Auto Scaling Group: i-063c0eab44eb5d87c [Pending]
Auto Scaling Group: i-063c0eab44eb5d87c [InService]
Waiting for ALB to become active (this may take up to 10 minutes) ...
Waiting for ALB Target Group to put instances in service ...
ALB: i-063c0eab44eb5d87c [healthy]
<strong class="success">Successfully running myuser/hello:1.0 in test at https://hello.boxfuse-example.com/</strong></pre>

And our app is fully up and running, load balanced in an auto scaling group with a custom domain and an automatic TLS certificate.

All deploys from here on are performed with zero downtime by simply launching a new auto scaling group and switch out the old one within the target group.

## BYOTG (Bring Your Own Target Group)

Advanced users also have the option to configure their own ALB and Target Group. From there all that is needed is
simply pointing Boxfuse at the name of the [desired Target Group](/docs/commandline/cfg#targetgroup) and Boxfuse will use
that one instead of the ALB and Target Group auto provisioning described above.

## Available today

Support for `load-balanced-https` apps is available today at no additional charge on all paid Boxfuse plans. Enjoy!

So if you haven't already,
[**sign up for your Boxfuse account**](https://console.boxfuse.com) now (simply log in with your GitHub id, it's free),
start deploying your application effortlessly to AWS today and have it running in minutes.