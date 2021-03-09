# MYSQL



add login_path

```
mysql_config_editor set --login-path=test --user=test_user  --host=127.0.0.1 --port=3306 --password
mysql_config_editor set -G=test -u=test_user -h=127.0.0.1 -P=3306 -p

mysql_config_editor set --login-path=gds_snap --user=heitao  --host=10.55.10.15 --port=3306 --password
mysql_config_editor set --login-path=gds_snap_1021 --user=heitao  --host=10.55.11.51 --port=3306 --password
```

show  login_path

```
mysql_config_editor print --all
mysql_config_editor print --login-path=test 
```

delete  login_path

```
mysql_config_editor remove --login-path=test
```

reset login_path

```
mysql_config_editor reset --login-path=test
```

use login_path login

```
mysql --login-path=test
```

