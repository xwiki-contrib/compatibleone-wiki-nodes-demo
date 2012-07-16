#!/bin/bash

MAVEN_VER="apache-maven-3.0.4"

workingDir="`pwd`"

needRoot()
{
    if [ "`id -u`" != "0" ]; then
        echo "Needs to be run as root."
        exit
    fi
}

needNonRoot()
{
    if [ "`id -u`" == "0" ]; then
        echo "Now run as non-root."
        exit
    fi
}

require()
{
    echo -n "Checking for $1...  "
    if [ "`which $1`" == "" ]; then
        echo "not found."
        echo "Installing $1";
        needRoot
        apt-get install $2
    else
        echo -e "found."
    fi
}

require java default-jdk
require git git
require wget wget
require unzip unzip

needNonRoot

[ -e $workingDir/build ] || mkdir $workingDir/build;
cd $workingDir/build
if [[ ! -e "${MAVEN_VER}" && "`which mvn`" == "" ]]; then
    closestMaven="`\
        wget -qO - http://www.apache.org/dyn/closer.cgi/maven/binaries/${MAVEN_VER}-bin.tar.gz \
        | grep ${MAVEN_VER}-bin.tar.gz | head -n 1 | sed 's/.*"\([^"]*\)".*/\1/' \
    `"

    echo "downloading: $closestMaven"
    wget $closestMaven
    tar xf "${MAVEN_VER}-bin.tar.gz"
    cd
    mkdir .m2
    [ -e .m2/settings.xml ] || echo '
<settings>
 <profiles>
   <profile>
     <id>xwiki</id>
     <repositories>
       <repository>
         <id>xwiki-releases</id>
         <name>XWiki Nexus Releases Repository Proxy</name>
         <url>http://nexus.xwiki.org/nexus/content/groups/public</url>
         <releases>
           <enabled>true</enabled>
         </releases>
         <snapshots>
           <enabled>false</enabled>
         </snapshots>
       </repository>
       <repository>
         <id>xwiki-snapshots</id>
         <name>XWiki Nexus Snapshot Repository Proxy</name>
         <url>http://nexus.xwiki.org/nexus/content/groups/public-snapshots</url>
         <releases>
           <enabled>false</enabled>
         </releases>
         <snapshots>
           <enabled>true</enabled>
         </snapshots>
       </repository>
     </repositories>
     <pluginRepositories>
       <pluginRepository>
         <id>xwiki-plugins-releases</id>
         <name>XWiki Nexus Plugin Releases Repository Proxy</name>
         <url>http://nexus.xwiki.org/nexus/content/groups/public</url>
         <releases>
           <enabled>true</enabled>
         </releases>
         <snapshots>
           <enabled>false</enabled>
         </snapshots>
       </pluginRepository>
       <pluginRepository>
         <id>xwiki-plugins-snapshots</id>
         <name>XWiki Nexus Plugin Snapshot Repository Proxy</name>
         <url>http://nexus.xwiki.org/nexus/content/groups/public-snapshots</url>
         <releases>
           <enabled>false</enabled>
         </releases>
         <snapshots>
           <enabled>true</enabled>
         </snapshots>
       </pluginRepository>
     </pluginRepositories>
   </profile>
 </profiles>
 <activeProfiles>
   <activeProfile>xwiki</activeProfile>
 </activeProfiles>
</settings>
' > .m2/settings.xml
fi
export PATH="$PATH:$workingDir/${MAVEN_VER}/bin"

downloadAndBuild()
{
    cd $workingDir/build
    if [ ! -e "$1" ]; then
        git clone $2 $1 || exit 1
        cd $1
        git checkout $3 || exit 1
        cd $4
        mvn clean install
    else
        cd $1
        git pull || exit 1
        git checkout $3 || exit 1
        cd $4
        mvn clean install
    fi
}

downloadAndBuild Datanucleus-Cassandra-Plugin git://github.com/xwiki-contrib/Datanucleus-Cassandra-Plugin.git master .
downloadAndBuild xwiki-platform git://github.com/xwiki/xwiki-platform.git feature-store-attachments-newstore xwiki-platform-core/xwiki-platform-store
downloadAndBuild xwiki-store-datanucleus git://github.com/xwiki-contrib/xwiki-store-datanucleus.git master xwiki-platform-store-datanucleus
downloadAndBuild xwiki-enterprise git://github.com/cjdelisle/xwiki-enterprise.git wiki-nodes .

cd $workingDir;
rm ./xwiki-enterprise-jetty-datanucleus-* -r;
mv `find $workingDir -name 'xwiki-enterprise-jetty-datanucleus-?.?-SNAPSHOT.zip'` $workingDir
unzip *.zip;

cp templates/start_xwiki.sh ./xwiki-enterprise-jetty-datanucleus-*/
cp templates/cassandra.yaml.vm ./xwiki-enterprise-jetty-datanucleus-*/webapps/xwiki/WEB-INF/classes/
rm ./xwiki-enterprise-jetty-datanucleus-*.zip;
