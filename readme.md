# XWiki/Cassandra distributed wiki demo

[![XWiki labs logo](https://raw.githubusercontent.com/xwiki-labs/xwiki-labs-logo/master/projects/xwikilabs/xwikilabsprototype.png "XWiki labs")](https://labs.xwiki.com/xwiki/bin/view/Main/WebHome)

This demo shows XWiki running as a cluster over a Cassandra cluster to form
a fully distributed and fault tollerant storage and wiki system.

It is optimized to run on a debian system but with a few changes to the `check.sh`
script it could run on redhat or any other type system.

To build simply run `check.sh` once as root and then once again as non-root, you
will be walked through the process. This compiles all of it's necessary elements
so be prepared to wait.

When you are finished you will have a directory like
xwiki-enterprise-jetty-datanucleus-4.1-SNAPSHOT which is a standalone XWiki
instance based on Cassandra rather than HSQL db.
Set the `BIND_TO` env variable to the ip address to bind, `ANNOUNCE_ADDR` to the
which address you should claim (not the same as BIND_TO if you are behind a nat)
and `CONNECT_TO` to a node to connect to, if all goes well, your node
will discover the est of the nodes in the cluster automatically.

For simple testing, a precompiled version is included in this repository in the
directory `xwiki-enterprise-jetty-datanucleus-4.1-SNAPSHOT-precompiled/`
