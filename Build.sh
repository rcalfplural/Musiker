echo "[0/4] Initializing building sequence..."

rm -rf Dist

mkdir Dist

cd Dist

echo "[1/4] Creating application directories..."

mkdir bin
mkdir data
mkdir out

cd ..

echo "[2/4] Loading necessary data for the run..."

cp -r node_modules Dist/data
cp -r src Dist/data
cp package.json Dist/data

echo "[3/4] Creating binaries..."

cp node.exe Dist/bin
cp Musiker.bat Dist

echo "[4/4] Building completed!"