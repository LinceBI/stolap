# STPivot4 Open Source OLAP tool


STPivot4 is based on the old Pivot4J project where functionality has been added, improved and extended. These techincal features are mentioned below.

For additional information, you may visit STPivot4 Project page at http://bit.ly/2gdy09H

Main Features:

* STPivot4 is Pentaho plugin for visualizing OLAP cubes.
* Deploys as Pentaho Plugin
* Supports Mondrian 4!
* Improves Pentaho user experience.
* Intuitive UI with Drag & Drop for Measures, Dimensions and Filters
* Adds key features to Pentaho OLAP viewer replacing JPivot.
* Easy multi-level member selection.
* Advanced and function based member selection (Limit, Ranking, Filter, Order).
* Let user create "on the fly" formulas and calculations using 
* Non MDX gran totals (min,max,avg and sum) per member, hierarchy or axis.
* New user friendly Selector Area
* and more…

## Instructions for Maven Beginners

### Structure

In this repository is the source code of STPivot. It is divided in two projects **stpivot4** and **stthemes-master**. 

The result of compiling this project is a pentaho plugin (in .zip, .tar.gz o .rar, as you prefer).

The stpivot4 project depends on stthemes-master, that means that you have to compile properly the last one, for being available for the main project, **stpivot4**. 

### Maven dependencies
We use maven for dependency management, so yo have to install maven in your system in order to execute the command line instructions for playing with the stpivot4 plugin, compile changes, install a dependency, etc.

The pom.xml files of each projects refers to the pentaho repository, that unfortunately is removing artifacts continuously and is changing too much lately, for this reason we try to keep update on those changes, but not always we achieve this, maybe some dependencies are referenced in our pom.xml files does not exists en pentaho repository, in that case you need to update what has changed in pentaho repo and made the changes to the affected pom.xml files. All this until there is an stable repository, 

### Compile and Install
Once you have maven installed go to the stthemes-master directory and execute the following commands:

mvn compile
mvn install

Then, do the same in the stpivot4 directory 


### Usage
This steps generate the artifact needed by the plugin, and the plugin in a compressed file. If every has worked fine the plugin is in:

${home}/.m2/repository/com/stratebi/stpivot4/stpivot4-pentaho/1.0-SNAPSHOT/stpivot4-pentaho-1.0-SNAPSHOT-plugin.zip

The next step: decompress this file in: pentaho-solutions/system/

Restart pentaho and in the "Home" page, click "Create New" -> "STPivot4"
