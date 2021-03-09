# jenkins

安装

```
下载jdk8
https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html

解压到
/usr/local/app/jdk1.8.0_271

修改/etc/profile 添加环境变量
export PATH=$PATH:/usr/local/app/jdk1.8.0_271/bin

source /etc/profile

下载jenkins.war文件
启动jenkins
nohup java -jar jenkins.war --httpPort=8080 &

查看密码
cat /home/nobody/.jenkins/secrets/initialAdminPassword
```

Jenkinsfile文件示例

```
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                retry(3){
                    sh 'echo "Hello World"'   
                }
                
                timeout(time: 1, unit: 'MINUTES') {
                    sh '''
                        echo "Multiline shell steps works too"
                        ls -lah
                    '''   
                }
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
```



```
pipeline {
    agent any
    environment {
        // 定义项目名称方便全局引用
        project     = "test-php"
    }
    triggers {
        gitlab( triggerOnPush: true, 
                triggerOnMergeRequest: true, 
                branchFilterType: 'All'
        )
    }
    options {
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 10, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    // 这里使用参数化构建的方式，而没有使用input参数，下边会说明一下原因。
    parameters {
        choice(name: 'MODE', choices: ['deploy','rollback'], description: '请选择发布或者回滚？')
    }
    stages {
        stage('部署') {
            when {
                environment name: 'MODE',value: 'deploy'
            }
            steps {
                script {
                    try {
                        sh '''
                            echo "部署"
                        '''
                    } catch(err) {
                        echo "${err}"
                    }
                }
            }
        }
        stage('回滚') {
            when {
                environment name: 'MODE',value: 'rollback'
            }
            steps {
                script {
                    try {
                        sh '''
                            echo "回滚"
                        '''
                    } catch(err) {
                        echo "${err}"
                    }
                }
            }
        }
        stage('清理工作空间') {
            steps {
                echo '清理工作空间'
                cleanWs()
            }
        }
    }
    post {
        success {
            dingtalk (
                                    robot: 'ff2c6f85-9f69-411a-86c6-00bce2581122',
                                    type: 'TEXT',
                                    text: [
                                        '测试成功文本类型的消息',
                                        '分行显示，哈哈哈哈'
                                    ],
                                    at: [
                                        '16602102151'
                                    ]
                     )
        }
        failure {
            dingtalk (
                                    robot: 'ff2c6f85-9f69-411a-86c6-00bce2581122',
                                    type: 'TEXT',
                                    text: [
                                        '测试失败文本类型的消息',
                                        '分行显示，哈哈哈哈'
                                    ],
                                    at: [
                                        '16602102151'
                                    ]
                    )
        }
    }
}
```

