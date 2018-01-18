---
layout: docs
menu: aws
subtitle: 'AWS'
---
![AWS](/assets/img/aws.png)

For test and production, Boxfuse runs your apps **on your AWS account**.

## Environments

By default Boxfuse creates two [**environments**](/docs/environments) you can use for running your apps on AWS: `test` and `prod`.

You do however have the option to create any number of [additional custom environments](/docs/environments#custom) such
as `stage` or `demo` to cover all your needs.

## Regions

Your Boxfuse account comes preconfigured with its **default region** set to `eu-central-1`. This is the region that will be
used for the `test` and `prod` environments. You can change this region using the button below the globe on the overview
tab of the Boxfuse Console.

Boxfuse fully supports the `ap-northeast-1`, `ap-south-1`, `ap-southeast-1`, `ap-southeast-2`, `ca-central-1`,
`eu-central-1`, `eu-west-1`, `eu-west-2`, `sa-east-1`, `us-east-1`, `us-east-2`, `us-west-1` and `us-west-2` regions.

We recommend **the regions in Australia, the EU and the US** (`ap-southeast-2`, `eu-central-1`, `eu-west-1`, `us-east-1`,
`us-west-1` and `us-west-2`) as we have **optimized them for AMI creation speed** with new Amazon Machine Images created in
under 60 seconds. This is 5x to 10x faster than any other tool in the industry.

{: .table .table-striped}

AWS Region | AMI Creation Time
---------- | -----------------
ap-northeast-1 | Less than 5 minutes
ap-northeast-2 | Less than 5 minutes
ap-south-1 | Less than 5 minutes
ap-southeast-1 | Less than 5 minutes
**ap-southeast-2** | **Less than 60 seconds**
ca-central-1 | Less than 5 minutes
**eu-central-1** | **Less than 60 seconds**
**eu-west-1** | **Less than 60 seconds**
eu-west-2 | Less than 5 minutes
sa-east-1 | Less than 5 minutes
**us-east-1** | **Less than 60 seconds**
us-east-2 | Less than 5 minutes
**us-west-1** | **Less than 60 seconds**
**us-west-2** | **Less than 60 seconds**

As Boxfuse expands its footprint, further regions will be optimized for fast deployment. The order will be based on 
customer usage and demand. This does not affect the runtime speed of your instance, which is determined by the instance 
type you selected.

## VPCs

Virtual Private Clouds let you isolate sections of the cloud at the network layer. Each AWS account comes with a default
VPC per region. You can create additional in the AWS Console should you have the need for it.

The `test` and `prod` [environments](/docs/environments) are created within the default VPC of the default
AWS region you selected for your Boxfuse account.

**Note:** It is currently not possible to select an AWS region that does not have a default VPC as your default region.
If your AWS account is missing a default VPC, you can ask AWS support to (re-)create it. Requests are usually fulfilled 
within a few hours.

You can use non-default VPCs as well as alternate regions in any [custom environments](/docs/environments#custom) you
create.

## Instance Types

Boxfuse supports all `t2`, `m5`, `m4`, `m3`, `c5`, `c4`, `c3`, `r4` and `r3` instance types in all available regions.

## App Types

All available [app types](/docs/apptypes) are supported. Regardless of the app type you select, Boxfuse always performs
**transactional zero downtime upgrades** of your apps when you redeploy them. Boxfuse uses healthchecks to ensure that
a good version of your app can never be replaced by a bad one.

## Security Groups

Security groups control access to your instances at the network layer. Boxfuse automatically creates security groups for
you that match the ports you have specified when fusing your image. This effectively restricts inbound network traffic
to just the necessary ports.
  
By default Boxfuse will create both a security group for each application as well as a security group for each
deployment. The security group for the application can be used as a source in other security groups to restrict access
to only allow inbound access from instances of your application, regardless of the version currently deployed.
 
This security group created for each deployment in turn opens the exact set of ports required for that version of your
application with the appropriate [restrictions](/blog/restricted-ports) if any were defined.

All security groups that have been created by Boxfuse are automatically removed when they are no longer in use.

### Custom Security Groups

Alternatively you can also explicitly configure a custom security group for every app in each 
[environment](/docs/environments) using the [`securitygroup`](/docs/commandline/cfg#securitygroup) property.. In this case, Boxfuse will not create any security groups for you and it is then
your responsibility to properly create, configure and decommission your security group.

## Tags

AWS Tags are a useful way to associate important metadata with AWS resources. Wherever supported by AWS and applicable all AWS resources created by Boxfuse are consistently tagged with one or more of the following tags:

{: .table .table-striped}

AWS Tag Name | Description | Example
------------ | ----------- | -------
`boxfuse:env` | The Boxfuse [environment](/docs/environments) | prod
`boxfuse:app` | The Boxfuse application | myuser/myapp
`boxfuse:image` | The Boxfuse image | myuser/myapp:1.2.3
`Name` | (For EC2 instances only) The Boxfuse image and environment | boxfuse myuser/myapp:1.2.3@prod

### Custom Tags

In addition to the standard tags created by Boxfuse you can also specify one or more custom tags that should be applied
to all created AWS resources using the [`tags`](/docs/commandline/cfg#tags) property. This is particularly useful for
things like cost allocation in your monthly AWS bill.

## Elastic IPs

An Elastic IP is a public IP address that can be freely remapped from one instance to another. When running a
`single-instance` app, Boxfuse will automatically provision an AWS Elastic IP in that
[environment](/docs/environments). As soon as healthchecks have passed for a deployment, your new instance becomes
reachable via the Elastic IP (as opposed to its initial public IP which it replaces). This is effectively makes the
Elastic IP the stable entry point into your application. Once the app is killed, the Elastic IP is also removed.

### Custom Elastic IPs

If this auto-provisioning doesn't work for you, you do have the option to set up your own Elastic IP and configure
Boxfuse to use it for a specific environment using the [`elasticip`](/docs/commandline/cfg#elasticip) property. This in
turn means that it is then also your responsibility to dispose of it when not needed anymore.

## ALBs

When running a `load-balanced-https` app, Boxfuse will automatically provision an AWS Application Load Balancer (ALB)
in that [environment](/docs/environments) to distribute incoming requests across all your instances.
The ALB will also be tagged using the `boxfuse:app` and `boxfuse:env` tags described above as well as any additional
custom tags you may have defined. Once the app is killed, the ALB will also be removed.

Boxfuse configures each ALB it provisions to load-balance all HTTP and HTTPS ports of an image at layer 7. The same
ports and protocols exposed by your image are also exposed by the ALB. This means that for HTTPS ports,
the ALB terminates HTTPS connections and initiates new HTTPS connections to your instances, ensuring data in motion
remains fully encrypted at all times.

### Target Groups

For an auto-scaling group to be able to attach instances to an ALB, the ALB needs a target group. Boxfuse will
automatically provision and configure this target group for you and wire it up with both a listener for the ALB and
the auto-scaling group for the instances. 

### Custom ALBs and Target Groups

If those defaults don't work for you, you do have the option to set up your own ALB and Target Groups and configure Boxfuse
to use a specific Target Group for a specific environment using the [`targetgroup`](/docs/commandline/cfg#targetgroup)
property. This in turn means that it is then your entire responsibility to ensure it is configured correctly and
decommissioned when not needed anymore.

## ELBs

When running a `load-balanced` app, Boxfuse will automatically provision an AWS Elastic Load Balancer (ELB)
in that [environment](/docs/environments) to distribute incoming requests across all your instances.
The ELB will also be tagged using the `boxfuse:app` and `boxfuse:env` tags described above as well as any additional
custom tags you may have defined. Once the app is killed, the ELB will also be removed.

Boxfuse configures each ELB it provisions to load-balance all open ports of an image at layer 4 (TCP).
Unlike for layer 7 (HTTP, HTTPS) load balancing this means that HTTPS connections are only terminated on your
instance and ensures the entire path between client and instance remains fully encrypted.

### Custom ELBs

If those defaults don't work for you, you do have the option to set up your own ELB and configure Boxfuse to use
it for a specific environment using the [`elb`](/docs/commandline/cfg#elb) property. This in turn means that it is then
your entire responsibility to ensure it is configured correctly and decommissioned when not needed anymore.

## Auto Scaling Groups

When running a `load-balanced-https`, `load-balanced` or `worker` app, Boxfuse will automatically provision an AWS
Auto Scaling Group for each deployment. This Auto Scaling Group will then automatically ensure the configured
[capacity](/docs/commandline/scale#capacity) will be met and automatically adjusted based on the configured triggers.

## Instance Profiles

To access other AWS services (using the AWS SDK for example) you need IAM credentials. While it is possible to bake
these directly into your image, AWS actually offers a better and more secure way to obtain them: IAM instance profiles.
Once an EC2 instance has been configured to use an IAM instance profile, AWS will automatically inject temporary IAM
credentials into the instance at launch time. They will then automatically be picked up by the AWS SDK when it connects
to a service.

### CloudWatch Logs

By default for apps using CloudWatch Logs, Boxfuse configures your instances to use an IAM Instance Profile
that allows your application to invoke `logs:PutLogEvents`. This is required in order to be able to send log events to
CloudWatch Logs.

### Custom Instance Profiles

You can however also very easily configure your app to use your own custom Instance Profile (which replaces any default
instance profile provided by Boxfuse) using the [`instanceprofile`](/docs/commandline/cfg#instanceprofile) property.
 
Note that if your app uses CloudWatch Logs, you must explicitly ensure it is be able to send logs to CloudWatch Logs
by including the following statement in the IAM policy attached to your custom instance profile:

```json
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:*:*:*"
      ]
    }
  ]
}
```

{: .next-steps}
[Custom Domains <i class="fa fa-arrow-right"></i>](/docs/domains){: .btn .btn-primary}