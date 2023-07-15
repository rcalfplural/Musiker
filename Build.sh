rm -rf Dist

mkdir Dist

cd Dist

mkdir bin
mkdir data
mkdir out

cd ..

cp -r node_modules Dist/data
cp -r src Dist/data
cp package.json Dist/data

cp node.exe Dist/bin
cp Musiker.bat Dist

echo Sex is done here.