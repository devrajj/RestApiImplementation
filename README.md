### To install packages

```
npm i 
```

## Please install mysql if not installed

```
brew install mysql@5.7
echo 'export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
brew services start mysql@5.7
mysql_secure_installation
```

### Please Note:

```
This Project is about a simple rest api which can be tested using POSTMAN as no Client Side is created
```
