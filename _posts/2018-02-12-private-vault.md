---
layout: blog
subtitle: "Introducing Private Vault"
permalink: /blog/private-vault.html
---
Boxfuse has always made it easy to to push and pull images to and from the Boxfuse Vault. Up until now the Boxfuse
Vault was implemented as an S3 bucket within Boxfuse's account. This is a very convenient solution that makes it easy
to get started. It does however come with a disadvantage that is increasingly important for our customers: even though
their images are fully encrypted, they still lie within our AWS account and not theirs.

## Introducing Private Vault

Today we are introducing the successor of the Boxfuse Vault: the **Private Vault**. It retains the same ease of use as
the Boxfuse Vault, but it is now also comes with the added security and privacy advantage of being stored in an S3
bucket on *your* AWS account. 

**Private Vault is now enabled on all new Boxfuse accounts by default.**

## Migrating from the Boxfuse Vault to your Private Vault

**Existing accounts can be migrated within a few seconds in the Boxfuse Console.** All you need to do is simply click
the **Upgrade to Private Vault** button on the *Overview* tab. An encrypted S3 bucket will then be created in the
default region for your AWS account (as selected under the globe on the overview tab in the Boxfuse Console). All images
you push from then on will automatically be stored in your new encrypted S3 bucket.
 
Existing images remain unaffected und can be accessed
as before. They still live within the legacy Boxfuse Vault and can be removed either manually via the Console or
automatically on a least recently used basis when your Vault capacity has been exceeded.

**This migration can take place at your best convenience until the 30th of June 2018.** Starting July first, existing
accounts that have not yet been migrated to Private Vault will automatically be migrated for you.

From then on any image stored in the legacy Boxfuse Vault remains accessible as usual until the 31st of December 2018.
After that the Boxfuse Vault will be retired and any images it still contains will be deleted. 

## Available today

Private Vault is available today to all Boxfuse users at no additional charge. Support for this is fully transparent.
All you need to do is upgrade your account and upgrade your client to version `1.32.0.1441` or newer and you'll
automatically benefit from the privacy and security advantages of Private Vault. Enjoy! 

So if you haven't already,
[**sign up for your Boxfuse account**](https://console.boxfuse.com) now (simply log in with your GitHub id, it's free),
start deploying your application effortlessly to AWS today and have it running in minutes.