---
layout: docs
menu: hyperv
subtitle: 'Hyper-V'
---
![Hyper-V](/assets/img/hyperv.png)

For development on Windows 10 Pro, Boxfuse can run your apps on **Hyper-V**.

## Environments

- dev

## Supported Versions

Boxfuse supports **Hyper-V** running on **Windows 10 Pro**.

## CPU &amp; RAM usage

You can control the number of CPUs exposed to the VM using the `cpus` property and the number of MB of RAM
using the `ram` property. By default, Boxfuse assigns 2 CPUs and 1024 MB of RAM to the Instance.

## Networking

Boxfuse creates a new public Hyper-V Virtual Switch on your external network interface.

### Accessing services running on the physical host

To make it easy to access services running on your physical machine (outside of your Boxfuse Hyper-V instance),
Boxfuse exposes an environment variable named `BOXFUSE_HOST_IP` to each of its Hyper-V instances. This environment
variable contains the IP address of your physical machine (example: 172.27.3.61) which you can use
this to construct URLs to access your services.

## Live images

To use Hyper-V with [live](/docs/live) images, you must set the [`windows.user`](/docs/commandline/run#windows.user) and
[`windows.password`](/docs/commandline/run#windows.password) properties to 
ensure the Hyper-V instance can access the directory on your host.

## AWS Credentials

To make it easy to access AWS services from your VirtualBox instances, Boxfuse automatically exposes the AWS
credentials stored by the AWS CLI on your local machine to the running instances.

Boxfuse will attempt to load credentials in the following order:

 1. The `boxfuse` profile in `~/.aws/credentials`
 2. The `default` profile in `~/.aws/credentials`
 3. The `default` section in `~/.aws/config`

You can also manually override this by explicitly setting the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
[environment variables](/docs/commandline/run#envvars).

## Limitations

[Database support](/docs/databases) is not yet available on Hyper-V. If you need this feature, use [VirtualBox](/docs/virtualbox) instead. 

{: .next-steps}
[AWS <i class="fa fa-arrow-right"></i>](/docs/aws){: .btn .btn-primary}