#  PHP



### composer

```
国内源

composer config -g repo.packagist composer https://packagist.phpcomposer.com

composer config repo.packagist composer https://packagist.phpcomposer.com


```





## 代码标准

```
 "scripts-descriptions": {
        "cs": "Tokenizes PHP, JavaScript and CSS files to detect violations of a defined coding standard.",
        "cbf": "Automatically correct coding standard violations.",
        "fixer": "Fixes code to follow standards.",
        "test": "Run all tests.",
        "unit": "Run Unit tests.",
        "feature": "Run Feature tests.",
        "clearCache": "Clear cache like coverage.",
        "coverage": "Show Coverage html.",
        "prompts": "Generate IDE prompts."
    },
"scripts": {
        "cs": "phpcs --standard=PSR2 -n ./",
        "cbf": "phpcbf --standard=PSR2 -n ./",
        "fixer": "php-cs-fixer fix ./",
        "test": [
            "@clearCache",
            "phpunit --colors=always"
        ],
        "unit": [
            "@clearCache",
            "phpunit --testsuite=Unit --colors=always"
        ],
        "feature": [
            "@clearCache",
            "phpunit --testsuite=Feature --colors=always"
        ],
        "clearCache": "rm -rf cache/*",
        "coverage": "open cache/coverage/index.html",
        "release": [
            "AlibabaCloud\\Release::release"
        ]
    }
```





#### phpcs和phpcbf

```
https://github.com/squizlabs/PHP_CodeSniffer

phpcs --standard=PSR2 -n ./
phpcbf --standard=PSR2 -n ./
```



#### php-cs-fixer

```
https://github.com/FriendsOfPHP/PHP-CS-Fixer

php-cs-fixer fix ./
```

