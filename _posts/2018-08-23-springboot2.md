---
layout: blog
subtitle: "Spring Boot 2 and t3 and r5 instances support"
permalink: /blog/springboot2.html
---
Today Boxfuse is introducing 2 important new features.

## Spring Boot 2 support

![Spring Boot](/assets/img/springboot.png)

Building upon Boxfuse's existing [Spring Boot 1.x support] (/blog/spring-boot-ec2), Boxfuse now fully supports 
**Spring Boot 2.0** and newer apps.

Spring Boot 2.0 is autodetected and Boxfuse will then auto-configure ports, healthchecks and more based on the new
property names introduced in Spring Boot's 2.0 release.

## T3 and R5 instance support

AWS recently released their new all hardware hypervisor called the **Nitro System** and along with it a number of
[new instance types](/blog/nitro) making full use of it.

Today Boxfuse expands its instance support to two new instances families, both running on the Nitro System.

First of all, Boxfuse now supports the brand new t3 burstable instances. They are 10% more cost effective than t2 and
run on more powerful hardware. All t2 users are encouraged to make the switch.

In addition to that, for RAM-heavy apps Boxfuse now fully supports the new r5 instances. The are more cost effective,
support more memory and come in a larger sizes at the top end as previous r4 and r3 instances. All r4 and r3 users are
encouraged to make the switch.

## Available today

Spring Boot 2 and t3 and r5 instance support is available today at no additional charge to all Boxfuse customers. Enjoy!

And if you haven't already,
[**sign up for your Boxfuse account**](https://console.boxfuse.com) now (simply log in with your GitHub id, it's free),
start deploying your application effortlessly to AWS today and have it running in minutes.