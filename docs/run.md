# 运行服务

## Windows

新建一个 bat 文件，输入以下代码:

```
@echo off
frpc.exe -c frpc.toml
pause
```

使用 Windows PowerShell 运行:

```
./frpc.exe -c ./frpc.toml
```

## Linux

使用 screen 命令运行:

```
#创建一个screen会话
screen -R frpc
#进入会话后运行frpc
./frpc -c ./frpc.toml
```

输入完成后 `CTRL+ A D` 退出 screen
