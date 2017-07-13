---
layout: getstarted
menu: play
subtitle: 'Get Started with Boxfuse & Play'
---
![Play](/assets/img/play.png)

This tutorial will get you started with Boxfuse and Play. It should take you about **5-10 minutes** to complete.

## Prerequisites

Before you begin, ensure you have successfully:

1. created a <strong><a href="https://console.boxfuse.com">Boxfuse Account</a></strong> (simply log in with your GitHub account, it's free)
2. downloaded and installed the latest <strong><a href="/getstarted/download">Boxfuse Client</a></strong>
3. downloaded and installed the latest <strong><a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">JDK</a></strong> with `JAVA_HOME` set up correctly
4. downloaded and installed the latest version of <strong><a href="http://www.scala-sbt.org/">SBT</a></strong>
5. downloaded and installed the latest version of <strong><a href="https://www.virtualbox.org/wiki/Downloads">VirtualBox</a></strong>

## Creating the Play application

Start by creating a Play Scala application using SBT:

<pre class="console"><span>&gt;</span> sbt new playframework/play-scala-seed.g8</pre>

Set the name to `getstarted-play` and keep the default for all other settings.
 
Once the generator completes, navigate to the newly created directory:

<pre class="console"><span>&gt;</span> cd getstarted-play</pre>

Then set the version in `build.sbt` to 1.0:

<pre class="prettyprint">version := "1.0"</pre>

Finally build a distribution zip:

<pre class="console"><span>getstarted-play&gt;</span> sbt dist</pre>

Great. Your Play application distribution zip is now available under `target/universal/getstarted-play-1.0.zip`.

## Fusing a Boxfuse image and running it locally on VirtualBox

Now it's time to fuse your application into a Boxfuse image and launch an instance of it on VirtualBox:

<pre class="console"><span>getstarted-play&gt;</span> boxfuse run</pre>

This command will run for a few seconds. During this time, Boxfuse will find your application, detect its type,
generating an image for it and launch it on VirtualBox. When it completes you should see a message like this:

<pre class="console"><strong class="success">Successfully started payload in 00:09.407s -> http://127.0.0.1:9000</strong></pre>

Now open your browser and navigate to this address to see your new application up and running within the VirtualBox VM:

![Play on VirtualBox](/assets/img/getstarted/play-virtualbox.png){: .screenshot}

You can also see your newly created image:

<pre class="console" style="font-size: 89%"><span>getstarted-play&gt;</span> boxfuse ls

Images available locally:
+----------------------------+-------------------------+-------+----------------------+--------------+---------+---------------------+
| Image                      |         Payload         | Debug |       Runtime        |    Ports     |  Size   |    Generated at     |
+----------------------------+-------------------------+-------+----------------------+--------------+---------+---------------------+
| myuser/getstarted-play:1.0 | getstarted-play-1.0.zip | false | Java 8.131.11 (Play) | http -> 9000 | 78023 K | 2017-07-13 13:24:34 |
+----------------------------+-------------------------+-------+----------------------+--------------+---------+---------------------+
Total: 1</pre>

As well as the instance that is running:

<pre class="console"><span>getstarted-play&gt;</span> boxfuse ps

Running Instances on VirtualBox in the dev environment :
+-------------+----------------------------+---------------------+-----------------------+---------------------+
|  Instance   |           Image            |        Type         |          URL          |     Launched at     |
+-------------+----------------------------+---------------------+-----------------------+---------------------+
| vb-8e800f05 | myuser/getstarted-play:1.0 | 2 CPU / 1024 MB RAM | http://127.0.0.1:9000 | 2017-07-13 13:24:40 |
+-------------+----------------------------+---------------------+-----------------------+---------------------+
Total: 1</pre>

<div class="marketing-testimonial-stripe marketing-testimonial-stripe-docs"></div>

<div class="marketing-testimonial marketing-testimonial-docs">
    <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
            <div>
                <blockquote>We’ve decided to deploy our Play application to AWS using Boxfuse
                    which was perfect for this need. A super quick deployment of a Play
                    application to an AWS instance (also requires an AWS account of
                    course). Without the overhead of all the usual setup and
                    configuration.
                </blockquote>
                <p>from <a href="http://blog.takipi.com/how-we-used-slack-scala-and-play-to-automate-our-lunch-order/">"How We Used Slack, Scala and Play to Automate Our Lunch
                    Order"</a><br> by <strong><a href="https://twitter.com/tzofias">Tzofia Shiftan</a></strong>, Full-stack team lead, Takipi</p>
            </div>
        </div>
    </div>
</div>

## Deploying your application to AWS

Now let's deploy the image to AWS. As Boxfuse works with your AWS account, it first needs the necessary permissions to do so.
So if you haven't already done so, go to the Boxfuse Console and **[connect your AWS account](https://console.boxfuse.com/#/awsAccount)** now.

Every new Boxfuse account comes with 3 environments: `dev`, `test` and `prod`.
`dev` is your local VirtualBox environment and `test` and `prod` are on AWS.

So let's deploy our application to the `prod` environment on AWS:

<pre class="console"><span>getstarted-play&gt;</span> boxfuse run -env=prod

Pushing myuser/getstarted-play:1.0 ...
Verifying myuser/getstarted-play:1.0 ...
Waiting for AWS to create an encrypted AMI for myuser/getstarted-play:1.0 in eu-central-1 (this may take up to 50 seconds) ...
AMI created in 00:39.363s in eu-central-1 -> ami-8b3794e4
Creating security group boxsg-myuser-prod-getstarted-play ...
Creating Log Stream boxfuse/prod > myuser/getstarted-play ...
Creating Elastic IP ...
Creating security group boxsg-myuser-prod-getstarted-play-1.0 ...
Launching t2.micro instance of myuser/getstarted-play:1.0 (ami-8b3794e4) in prod (eu-central-1) ...
Instance launched in 00:18.803s -> i-0cb10e26f54c87971
Creating Cloud Watch Alarm for Instance auto-recovery -> i-0cb10e26f54c87971-auto-recovery-alarm
Waiting for AWS to boot Instance i-0cb10e26f54c87971 and Payload to start at http://35.158.117.251:9000/ ...
Payload started in 00:09.544s -> http://35.158.117.251:9000/
Associating Elastic IP 52.58.243.45 with i-0cb10e26f54c87971 ...
Waiting 15s for AWS to complete Elastic IP Zero Downtime transition ...
<strong class="success">Successfully running myuser/getstarted-play:1.0 in prod at http://getstartedplay-myuser.boxfuse.io:9000/</strong></pre>

Notice that we have now specified an image, as we want to reuse our image unchanged instead fusing a new one.

With that one command Boxfuse has automatically pushed your image to the Boxfuse Vault as well as provisioned,
configured and secured all necessary AWS resources. There is no manual work necessary on your behalf.

All you need to do is simply navigate to your new domain to see your Play application in action on AWS:

![Play on AWS]()/assets/img/getstarted/play-aws.png){: .screenshot}

## Bonus: update your application using blue/green deployments

Now let's take things one step further and deploy an update of your application with **zero downtime**.

Start by modifying `app/views/index.scala.html` with a simple change:

```
@()
                         
@main("Updated by Boxfuse with zero downtime") {
  <h1>Updated by Boxfuse with zero downtime!</h1>
}
```

then bump the version in `build.sbt`:

<pre class="prettyprint">version := "1.1"</pre>

and rebuild the dist:

<pre class="console"><span>getstarted-play&gt;</span> sbt clean dist</pre>

Finally, deploy the new version of your application to AWS:

<pre class="console"><span>getstarted-play&gt;</span> boxfuse run -env=prod

Fusing Image for getstarted-play-1.1.zip (Play) ...
Image fused in 00:04.787s (78024 K) -> myuser/getstarted-play:1.1
Pushing myuser/getstarted-play:1.1 ...
Verifying myuser/getstarted-play:1.1 ...
Waiting for AWS to create an encrypted AMI for myuser/getstarted-play:1.1 in eu-central-1 (this may take up to 50 seconds) ...
AMI created in 00:30.962s in eu-central-1 -> ami-b73093d8
Creating security group boxsg-myuser-prod-getstarted-play-1.1 ...
Launching t2.micro instance of myuser/getstarted-play:1.1 (ami-b73093d8) in prod (eu-central-1) ...
Instance launched in 00:28.872s -> i-0a2461d56ca5060a3
Creating Cloud Watch Alarm for Instance auto-recovery -> i-0a2461d56ca5060a3-auto-recovery-alarm
Waiting for AWS to boot Instance i-0a2461d56ca5060a3 and Payload to start at http://35.158.133.205:9000/ ...
Payload started in 00:12.630s -> http://35.158.133.205:9000/
Reassociating Elastic IP 52.58.243.45 from i-0cb10e26f54c87971 to i-0a2461d56ca5060a3 ...
Waiting 15s for AWS to complete Elastic IP Zero Downtime transition ...
Destroying Cloud Watch Alarm i-0cb10e26f54c87971-auto-recovery-alarm ...
Terminating instance i-0cb10e26f54c87971 ...
Destroying Security Group sg-7646171d (boxsg-myuser-prod-getstarted-play-1.0) ...
<strong class="success">Successfully running myuser/getstarted-play:1.1 in prod at http://getstartedplay-myuser.boxfuse.io:9000/</strong></pre>

And there it is:

![Play on AWS updated](/assets/img/getstarted/play-aws-update.png){: .screenshot}

## Summary

In this brief guide we have seen how to:

- create a Play application
- fuse it into a Boxfuse image
- deploy the image locally on VirtualBox
- deploy the image unchanged to AWS
- update the application with zero downtime

Now it's your turn. Take your favorite Play application and deploy it with ease and pleasure.

{: .next-steps}
[Boxfuse Play Documentation <i class="fa fa-arrow-right"></i>](/docs/payloads/play){: .btn .btn-primary}