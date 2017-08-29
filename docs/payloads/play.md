---
layout: docs
menu: play
subtitle: 'Play'
---
![Play](/assets/img/play.png)

Boxfuse supports **Play 2.3.x or newer** apps packaged as a **Play dist zip** using either **OpenJDK 7.x or 8.x**.

## Get Started

If you haven't already, start by following **[Play &amp; Boxfuse tutorial](/getstarted/play)** that will get you **up and running in 5-10 minutes**.

## Java Runtime Environment

By default Boxfuse uses the **latest OpenJDK 8.x version** (headless JRE).

### OpenJDK version

If you want to switch to OpenJDK 7.x or simply an older version, you can do so using the `-components.openjdk` configuration setting:

<pre class="console"><span>&gt;</span> boxfuse run my-app-1.0.jar <strong>-components.openjdk=</strong>7.80.32</pre>

To find out which OpenJDK versions are available from the Boxfuse Inventory you can simply issue:

<pre class="console"><span>&gt;</span> boxfuse inventory openjdk</pre>

### Custom JRE

If you prefer to use a different JRE, such as the **Oracle JRE**, rather than the default OpenJDK one,
you can do so by including the **Linux x64** JRE distribution of your choice in a `/jre` folder *inside* the Play dist zip file.

This `/jre` folder should be put into the `conf` directory of your project:

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <span><i class="fa fa-folder-open"></i> jre
  <i class="fa fa-folder-open"></i> bin
    <i class="fa fa-file"></i> java
    <i class="fa fa-file"></i> ...
  <i class="fa fa-folder-open"></i> lib
    <i class="fa fa-folder"></i> amd64
    <i class="fa fa-folder"></i> ...
    <i class="fa fa-file"></i> rt.jar
    <i class="fa fa-file"></i> ...
  <i class="fa fa-file-text"></i> COPYRIGHT
  <i class="fa fa-file-text"></i> LICENSE
  <i class="fa fa-file"></i> ...</span></pre>

<div class="alert alert-info"><p><strong>Tip for Git users</strong></p>
    <p>To avoid file corruption due to Git line-ending normalization, add the following line to `.gitattributes`</p>
    <pre class="prettyprint" style="margin-bottom: 0">conf/jre/* binary</pre>
</div>

## Configuration

By default Boxfuse looks for an `application.conf` file *inside* the Play dist zip file.
You can find this file in the `/conf` directory of your project:

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <span><i class="fa fa-file-text"></i> application.conf</span></pre>

Boxfuse parses **`application.conf`** and **automatically configures the http &amp; https ports, the payload path and the healthcheck path** based on the
following config parameters: `play.server.http.port`, `play.server.https.port` and `play.http.context`.

When both `play.server.http.port` and `play.server.https.port` are set, the https port takes precedence for the healthcheck.
You can override this by explicitly passing the Boxfuse parameter `-healthcheck.port=http` when fusing the image.

### Application secret
    
As Boxfuse runs your application in *production mode* you must set your *application secret* either in `application.conf`
or pass it from the command-line. For example:

{: .table .table-striped}

Play Version | Play Setting
------------ | ------------
2.6 | `play.http.secret.key="QCY?tAnfk?aZ?iwrNwnxIlR6CTf:G3gf:90Latabg@5241ABR5W:1uDFN];Ik@n"`{: .prettyprint}
2.5 | `play.crypto.secret="QCY?tAnfk?aZ?iwrNwnxIlR6CTf:G3gf:90Latabg@5241ABR5W:1uDFN];Ik@n"`{: .prettyprint}
2.4 | `play.crypto.secret="QCY?tAnfk?aZ?iwrNwnxIlR6CTf:G3gf:90Latabg@5241ABR5W:1uDFN];Ik@n"`{: .prettyprint}
2.3 | `application.secret="QCY?tAnfk?aZ?iwrNwnxIlR6CTf:G3gf:90Latabg@5241ABR5W:1uDFN];Ik@n"`{: .prettyprint}

More info in the [official Play documentation](https://playframework.com/documentation/2.6.x/ApplicationSecret).

### Allowed hosts filter

If your application uses the allowed hosts filter you must ensure `play.filters.hosts.allowed` in
`application.conf` allows connections from anywhere as this filter otherwise causes ELB healthchecks to fail. For example:

<pre class="prettyprint">play.filters.hosts {
  allowed = ["."]
}</pre>

More info in the [official Play documentation](https://www.playframework.com/documentation/2.6.x/AllowedHostsFilter).

### Alternative Play config files

By default, Play loads the `application.conf` file in the `conf` directory of your app.
You can however tell play to use alternative config files by passing in a JVM system property. So for:

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <i class="fa fa-file-text"></i> application.conf
    <span><i class="fa fa-file-text"></i> other.conf</span></pre>

You could then launch your Boxfuse instance with `-jvm.args=-Dconfig.file=other.conf` to load the
alternate Play config file called `other.conf` in the conf directory of your application.

**Note:** these files must be present at the time you build the dist zip using `sbt dist`.
Also keep in mind that [Boxfuse auto-configuration](#configuration) only works with the regular `application.conf` file.

## Overriding Play configuration

As an alternative to overriding the entire configure you can also selectively override individual configuration properties
on instance launch.

### Using JVM system properties

The first option is to use JVM system properties. For example: `-jvm.args=-Dplay.http.secret.key=abcdefghijk`

More info in the [official Play documentation](https://www.playframework.com/documentation/2.6.x/ProductionConfiguration#Overriding-configuration-with-system-properties).

### Using environment variables

Play also gives you the opportunity to override configuration properties using environment variables. Say if you have
defined `my.key = ${?MY_KEY_ENV}` in your Play configuration file, you can now override it on instance launch
using `-envvars.MY_KEY_ENV=myvalue`.

More info in the [official Play documentation](https://www.playframework.com/documentation/2.6.x/ProductionConfiguration#Using-environment-variables).

## Databases

### Database auto-provisioning

If your app includes the PostgreSQL or MySQL JDBC driver, Boxfuse will automatically activate
[database auto-provisioning support](/docs/databases) and provision the necessary PostgreSQL or MySQL database
in each environment as well as auto-configure Play's DataSource. Alternatively you can also explicitly configure database auto-provisioning by passing in
the correct `db.type` value when [creating your Boxfuse app](/docs/commandline/create#db.type).

When using database auto-provisioning, Boxfuse automatically configures Play's DataSource
to use the correct driver class name, jdbc url, user and password. It does so by automatically supplying the
`db.default.driver`, `db.default.url`, `db.default.username` and `db.default.password` with the
correct value for the current environment to the JVM.

### Slick

For Play 2.4 and newer apps that include the PostgreSQL or MySQL JDBC driver and use Slick instead of the regular Play database access, Boxfuse also automatically configures
Slick's driver, the jdbc driver class name, jdbc url, user and password. This can be disabled by setting
`db.type` to `none` when [creating your Boxfuse app](/docs/commandline/create#db.type).

You can also override these auto-configured values by explicitly passing them as [JVM arguments](/docs/commandline/fuse#jvm.args). For example, to
override the Slick driver you can do so like this:

<pre class="console"><span>&gt;</span> boxfuse fuse my-play-app-1.0.zip <strong>-jvm.args=-Dslick.dbs.default.driver=my.custom.SlickDriver</strong></pre>

### Using an existing database

To disable database auto-provisioning and use an existing database set `db.type` to `none` when [creating your Boxfuse app](/docs/commandline/create#db.type).

### Evolutions

If you choose to use Play Evolutions to migrate your database schema (as opposed to [Flyway](https://flywaydb.org)) you have to ensure evolutions
are applied automatically to prevent application startup issues.
    
For Play 2.3.x, set `applyEvolutions.`*database*`=true` in your Play config ([reference docs](https://www.playframework.com/documentation/2.3.x/Evolutions#Running-Evolutions-in-Production)).

For Play 2.4.x and newer, set `play.evolutions.autoApply=true` in your Play config ([reference docs](https://www.playframework.com/documentation/2.4.x/Evolutions#Evolutions-configuration">reference docs)).

## TLS (SSL) Certificates / HTTPS

### Automatic TLS (SSL) Certificate management

To expose your app via **HTTPS** make sure you have a [custom domain](/docs/domains) configured
for the [environment](/docs/environments) where you want to run it. Also make sure that you have obtained
a [valid TLS (SSL) certificate](/docs/tls) and that your [app has been created](/docs/commandline/create)
with `app.type` set to `load-balanced` and `tls.type` set to `acm` (AWS Certificate Manager).

With that in place your Play app will be automatically configured to run with HTTPS and a green lock will appear in the browser.

You can also manually force the correct configuration by adding these properties to your Play config file:

<pre class="prettyprint">play.server.https.port=443</pre>

Boxfuse will automatically ensure that all network traffic between the load balancer and your instances will be encrypted as well.

### Manual TLS (SSL) Certificate management

To use HTTPS with your own certificate, you first have to obtain a valid certificate from a Certificate Authority and
add a KeyStore containing your SSL certificate inside the zip file at `/conf/boxfuse.jks`.
If you use SBT or Typesafe Activator, this means your `boxfuse.jks` keystore file should be put into the `conf` directory.

Both the keystore itself as well as the certificate should be secured with the password `boxfuse`.

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <span><i class="fa fa-file"></i> boxfuse.jks</span></pre>

f present, Boxfuse automatically configures your Play application to use it. All you need to do is set the `https`
port to the one you want. This can be done either in your Boxfuse or in your Play config. Example:

<pre class="console"><span>&gt;</span> boxfuse run <strong>-ports.https</strong>=443</pre>

To use an alternative keystore called say `mykeystore.jks`, simply place it in the `conf` directory and refer to it using a relative path like `conf/mykeystore.jks`.
You can then also specify its password as usual in your `application.conf` file.

## Root Certificates

By default, Boxfuse uses the **same root certificate bundle as the latest version of Firefox**.
Additionally Boxfuse also includes the **root certificates for Amazon RDS**, so you can connect securely to RDS databases out of the box.

You can, however, ship your own set of root certificates, by placing them in a KeyStore inside the Zip file as `/conf/cacerts`.
If you use SBT or Typesafe Activator, this means your `cacerts` KeyStore file should be put into the `conf` directory.
Boxfuse will then automatically configure the JRE to use these instead.

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <span><i class="fa fa-file"></i> cacerts</span></pre>

If you choose to secure your `cacerts` TrustStore with a password different than the default `changeit`,
you have to add the following to your Play configuration:

<pre class="prettyprint">play.ws.ssl {
  trustManager = {
      stores = [
        { path: /cacerts/cacerts, password = "my0th3rPwd" }
      ]
  }
}</pre>

## JCE unlimited strength cryptography

### Using Boxfuse's default JRE

To enable JCE unlimited cryptography (for AES-256, RSA-4096, ...), download the policy zip from the Oracle website
for either [Java 7](http://www.oracle.com/technetwork/java/javase/downloads/jce-7-download-432124.html)
or [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html).

Extract both `local_policy.jar` and `US_export_policy.jar` and place them inside the Zip file under `/conf`.
If you use SBT, this means both policy jar files should be put into the `conf` directory.
Boxfuse will then automatically configure the JRE to use these instead.

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <span><i class="fa fa-file"></i> local_policy.jar
<i class="fa fa-file"></i> US_export_policy.jar</span></pre>

### Using a custom JRE

If you use a [custom JRE](#custom-jre) it is your responsibility to ensure it is configured for unlimited
strength cryptography if you need it.

## Java Agents

If you wish to launch the JRE with one or more Java Agents, simply place the Java Agent files inside the Zip file under
`/conf/javaagents/`. In a SBT or Typesafe Activator project this means you have to put your agent jar and whatever other files it requires under `conf/javaagents`:

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <span><i class="fa fa-folder-open"></i> javaagents
  <i class="fa fa-file"></i> myjavaagent.jar
  <i class="fa fa-file-text"></i> myjavaagent.properties</span></pre>

Boxfuse will then **automatically configure the JRE to use these Java Agents**.

## JVM Memory

By default Boxfuse will **dynamically configure your JVM heap to use 85% of the available memory** in the instance. All other settings
use the JVM defaults. You can override this by specifying the required JVM arguments like `-Xmx` via the
`jvm.args` configuration setting.

## Temporary Files

Boxfuse configures the JVM to use `/tmp` as the directory to store temporary files and provisions **1 GB of space by default**.
    
To increase this (up to a maximum of 16 TB), simply set
the `tmp` configuration setting to the number of GB of temp space you need. To prevent Boxfuse from
provisioning any temp space set `tmp` to `0`.

## Debugging

Remote debugging (including hot-code replace) with your favorite IDE is fully supported.
Details and setup instructions on our [debugging page](/docs/debugging).

## Profiling

Profiling with tools like JVisualVM and Java Flight Recorder is fully supported.
Details and setup instructions on our [profiling page](/docs/profiling).

## Live Reloading

Boxfuse supports [Live Reloading](/docs/live) of exploded Play zip files.

## Time Zone

By default all Boxfuse instance use the **`UTC` time zone**.

We **don't recommend changing this** as this greatly simplifies time zone issues in machine to machine communication
and cleanly relegates all time zones related aspects to a pure presentation layer concern.

If however you still do want to change this, you can override the default time zone of the instance using the
`TZ` environment variable. For example to change the time zone of your instance to `America/Los_Angeles`
you would do so like this:

<pre class="console"><span>&gt;</span> boxfuse fuse <strong>-envvars.TZ=</strong>America/Los_Angeles</pre>

## Native binaries and libs

Some JVM applications also depend on **native Linux x64 binaries and libs** to do their work. Boxfuse makes it easy to
integrate them into your image.

Simply place your binaries under `conf/native/bin` and Boxfuse
will automatically add them to the `PATH` at runtime in your instances.

If those binaries also depend on additional shared libraries beyond the C library, place the .so files of your libraries
under `conf/native/lib` on the classpath and Boxfuse
will automatically add them to the `LD_LIBRARY_PATH` at runtime in your instances.

<div class="alert alert-info"><p><strong>Tip</strong></p>
    <p>To list all the shared libraries your Linux x64 binary requires, you can use the following command on a Linux system:</p>
    <pre class="console" style="margin-bottom: 0"><span>$</span> ldd -v my-native-binary</pre>
</div>

In a SBT or Typesafe Activator project, the `native` directory should be put under the `conf`
directory. Boxfuse will then automatically configure the `PATH` and `LD_LIBRARY_PATH` to use it.

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <span><i class="fa fa-folder-open"></i> native
  <i class="fa fa-folder-open"></i> bin
    <i class="fa fa-file"></i> my-native-binary
    <i class="fa fa-file"></i> other-linux-x64-binary
  <i class="fa fa-folder-open"></i> lib
    <i class="fa fa-file"></i> my-shared-lib.so
    <i class="fa fa-file"></i> other-shared-lib.so</span></pre>

You can then simply invoke them in your code using

<pre class="prettyprint">Runtime.getRuntime().exec("my-native-binary arg1 arg2 arg3");</pre>

## New Relic support

To monitor your app using [New Relic](/docs/newrelic) simply pass in your New Relic license key when
fusing your image and Boxfuse will automatically install and configure the New Relic Servers Linux x64 and New Relic Java agents for you.

<pre class="console"><span>&gt;</span> boxfuse fuse <strong>-newrelic.licensekey=</strong>0123456789abcdef0123456789abcdef01234567</pre>

Alternatively you can also supply a `newrelic.yml` configuration file for the Java agent and Boxfuse will
automatically use that instead. Boxfuse will then install the agent for you, but won't override any application name you may have configured.
If you haven't configured a New Relic license key as described above, Boxfuse will use
the license key contained in your `newrelic.yml` configuration file instead.

In a SBT or Typesafe Activator project, the `newrelic.yml` file should be put into the `conf` directory.
Boxfuse will then automatically configure the New Relic Java agent to use it.

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <span><i class="fa fa-file"></i> newrelic.yml</span></pre>

### Sending stacktraces

To ensure New Relic is able to show stack traces for errors, you must [include the New Relic API](https://docs.newrelic.com/docs/agents/java-agent/frameworks/scala-installation-java)
and [extend Play's default error handler](https://www.playframework.com/documentation/2.6.x/ScalaErrorHandling#Extending-the-default-error-handler)
so that each error gets properly reported:

<pre class="prettyprint">import javax.inject._

import play.api.http.DefaultHttpErrorHandler
import play.api._
import play.api.mvc._
import play.api.mvc.Results._
import play.api.routing.Router
import scala.concurrent._

import com.newrelic.api.agent.NewRelic

@Singleton
class ErrorHandler @Inject() (
    env: Environment,
    config: Configuration,
    sourceMapper: OptionalSourceMapper,
    router: Provider[Router]
  ) extends DefaultHttpErrorHandler(env, config, sourceMapper, router) {

  override def onProdServerError(request: RequestHeader, exception: UsefulException) = {
    NewRelic.noticeError(exception)
    super.onProdServerError(request, exception)
  }
}</pre>

## Linux Kernel Tuning (experts only)

### Kernel arguments

To tune the arguments passed Linux kernel from the bootloader, simply pass them using the
[`-linux.args`](/docs/commandline/fuse#linux.args) setting when fusing your image.

### sysctl.conf

If you need to tune the Linux kernel running in your instance, simply place a `sysctl.conf` file inside the Zip file under
`/conf`. In a SBT or Typesafe Activator project this means you have to put it under `/conf`:

<pre class="filetree"><i class="fa fa-folder-open"></i> my-play-app
  <i class="fa fa-folder-open"></i> conf
    <span><i class="fa fa-file-text"></i> sysctl.conf</span></pre>

You can then for example tune the maximum number of file descriptors by simply including the following in `sysctl.conf`:

<pre class="prettyprint">fs.file-max = 131072</pre>

Boxfuse will then **automatically configure the Linux kernel to use these settings**.

{: .next-steps}
[Tomcat <i class="fa fa-arrow-right"></i>](/docs/payloads/tomcat){: .btn .btn-primary}