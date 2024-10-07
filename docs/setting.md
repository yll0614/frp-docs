# Frpc 配置

修改 `frpc.toml`

```
[common]
 server_addr = frps.20081122.xyz
 server_port = 7000
 token = frp.xyz

 # 穿透需要 Web 访问的内网服务，例如群晖 NAS DSM 的管理界面。
[http]
 type = http
 local_ip = 127.0.0.1
 local_port = 80
 custom_domains = www.test.com

[https]
 type = https
 local_ip = 127.0.0.1
 local_port = 443
 custom_domains = www.test.com

#穿透需要 tcp 连接的内网服务,例如 SSH 的 22 端口或者 3389 的 Windowws 远程访问端口。
[linux_ssh]
 type = tcplocal
 ip = 192.168.1.5
 local _port = 22
 remote_port = 22222

[windows_rdp]
 type = tcp
 local_ip = 192.168.1.6
 local port = 3389
 remote_port = 33333
```

## 基础配置

| 参数                          | 类型   | 说明                                               | 默认值                 | 可选值                          | 备注                                                                                    |
| :---------------------------- | :----- | :------------------------------------------------- | :--------------------- | :------------------------------ | :-------------------------------------------------------------------------------------- |
| server_addr                   | string | 连接服务端的地址                                   | 0.0.0.0                |                                 |                                                                                         |
| server_port                   | int    | 连接服务端的端口                                   | 7000                   |                                 |                                                                                         |
| nat_hole_stun_server          | string | xtcp 打洞所需的 stun 服务器地址                    | stun.easyvoip.com:3478 |                                 |                                                                                         |
| connect_server_local_ip       | string | 连接服务端时所绑定的本地 IP                        |                        |                                 |                                                                                         |
| dial_server_timeout           | int    | 连接服务端的超时时间                               | 10                     |                                 |                                                                                         |
| dial_server_keepalive         | int    | 和服务端底层 TCP 连接的 keepalive 间隔时间，单位秒 | 7200                   |                                 | 负数不启用                                                                              |
| http_proxy                    | string | 连接服务端使用的代理地址                           |                        |                                 | 格式为 {protocol}://user:passwd@192.168.1.128:8080 protocol 目前支持 http、socks5、ntlm |
| log_file                      | string | 日志文件地址                                       | ./frpc.log             |                                 | 如果设置为 console，会将日志打印在标准输出中                                            |
| log_level                     | string | 日志等级                                           | info                   | trace, debug, info, warn, error |                                                                                         |
| log_max_days                  | int    | 日志文件保留天数                                   | 3                      |                                 |                                                                                         |
| disable_log_color             | bool   | 禁用标准输出中的日志颜色                           | false                  |                                 |                                                                                         |
| pool_count                    | int    | 连接池大小                                         | 0                      |                                 |                                                                                         |
| user                          | string | 用户名                                             |                        |                                 | 设置此参数后，代理名称会被修改为 {user}.{proxyName}，避免代理名称和其他用户冲突         |
| dns_server                    | string | 使用 DNS 服务器地址                                |                        |                                 | 默认使用系统配置的 DNS 服务器，指定此参数可以强制替换为自定义的 DNS 服务器地址          |
| login_fail_exit               | bool   | 第一次登陆失败后是否退出                           | true                   |                                 |                                                                                         |
| protocol                      | string | 连接服务端的通信协议                               | tcp                    | tcp, kcp, quic, websocket       |                                                                                         |
| quic_keepalive_period         | int    | quic 协议 keepalive 间隔，单位: 秒                 | 10                     |                                 |                                                                                         |
| quic_max_idle_timeout         | int    | quic 协议的最大空闲超时时间，单位: 秒              | 30                     |                                 |                                                                                         |
| quic_max_incoming_streams     | int    | quic 协议最大并发 stream 数                        | 100000                 |                                 |                                                                                         |
| tls_enable                    | bool   | 启用 TLS 协议加密连接                              | true                   |                                 |                                                                                         |
| tls_cert_file                 | string | TLS 客户端证书文件路径                             |                        |                                 |                                                                                         |
| tls_key_file                  | string | TLS 客户端密钥文件路径                             |                        |                                 |                                                                                         |
| tls_trusted_ca_file           | string | TLS CA 证书路径                                    |                        |                                 |                                                                                         |
| tls_server_name               | string | TLS Server 名称                                    |                        |                                 | 为空则使用 server_addr                                                                  |
| disable_custom_tls_first_byte | bool   | TLS 不发送 0x17                                    | true                   |                                 | 当为 true 时，不能端口复用                                                              |
| tcp_mux_keepalive_interval    | int    | tcp_mux 的心跳检查间隔时间                         | 60                     |                                 | 单位：秒                                                                                |
| heartbeat_interval            | int    | 向服务端发送心跳包的间隔时间                       | 30                     |                                 | 建议启用 tcp_mux_keepalive_interval，将此值设置为 -1                                    |
| heartbeat_timeout             | int    | 和服务端心跳的超时时间                             | 90                     |                                 |                                                                                         |
| udp_packet_size               | int    | 代理 UDP 服务时支持的最大包长度                    | 1500                   |                                 | 服务端和客户端的值需要一致                                                              |
| start                         | string | 指定启用部分代理                                   |                        |                                 | 当配置了较多代理，但是只希望启用其中部分时可以通过此参数指定，默认为全部启用            |
| meta_xxx                      | map    | 附加元数据                                         |                        |                                 | 会传递给服务端插件，提供附加能力                                                        |

## 权限验证

| 参数                        | 类型   | 说明                    | 默认值 | 可选值      | 备注                                         |
| :-------------------------- | :----- | :---------------------- | :----- | :---------- | :------------------------------------------- |
| authentication_method       | string | 鉴权方式                | token  | token, oidc | 需要和服务端一致                             |
| authenticate_heartbeats     | bool   | 开启心跳消息鉴权        | false  |             | 需要和服务端一致                             |
| authenticate_new_work_conns | bool   | 开启建立工作连接的鉴权  | false  |             | 需要和服务端一致                             |
| token                       | string | 鉴权使用的 token 值     |        |             | 需要和服务端设置一样的值才能鉴权通过         |
| oidc_client_id              | string | oidc_client_id          |        |             |                                              |
| oidc_client_secret          | string | oidc_client_secret      |        |             |                                              |
| oidc_audience               | string | oidc_audience           |        |             |                                              |
| oidc_scope                  | string | oidc_scope              |        |             |                                              |
| oidc_token_endpoint_url     | string | oidc_token_endpoint_url |        |             |                                              |
| oidc_additional_xxx         | map    | OIDC 附加参数           |        |             | map 结构，key 需要以 `oidc_additional_` 开头 |

## UI

| 参数         | 类型   | 说明                        | 默认值  | 可选值 | 备注                                                                         |
| :----------- | :----- | :-------------------------- | :------ | :----- | :--------------------------------------------------------------------------- |
| admin_addr   | string | 启用 AdminUI 监听的本地地址 | 0.0.0.0 |        |                                                                              |
| admin_port   | int    | 启用 AdminUI 监听的本地端口 | 0       |        |                                                                              |
| admin_user   | string | HTTP BasicAuth 用户名       |         |        |                                                                              |
| admin_pwd    | string | HTTP BasicAuth 密码         |         |        |                                                                              |
| asserts_dir  | string | 静态资源目录                |         |        | AdminUI 使用的资源默认打包在二进制文件中，通过指定此参数使用自定义的静态资源 |
| pprof_enable | bool   | 启动 Go HTTP pprof          | false   |        | 用于应用调试                                                                 |

## Frpc.ini 配置讲解

frpc.ini 是 frp 客户端中重要的配置文件,错误的配置会导致服务无法访问,部分重要的参数会直接导致 frp 客户端无法启动,点击下载 frpc.ini 样本,并参考以下文档仔细修改每条参数.

frpc.ini 主要分为两部分,其中第一部分 [common] 为服务器连接配置,第二部分为所需穿透的各项服务配置,服务配置又分为需要 Web 访问的 HTTP/HTTPS 协议穿透服务和 TCP 协议穿透服务.

```[common]
server_addr = frps.20081122.xyz
#服务提供商提供的 frp 服务器 IP 地址或者域名地址

server_port = 7000
#服务提供商提供的 frp 服务端口号

token = frp.xyz
#服务提供商提供的密码
```

HTTP/HTTPS

同一个域名只能穿透一个 HTTP/HTTPS 服务,如需穿透多个 Web ,请分别为每个 Web 服务分配各自的域名,并正确的将 CNAME 指向 frps.20081122.xyz.

例如 : 示例中 nas.yourname.com 已经分别配置到了群晖 NAS 的 HTTP 和 HTTPS 端口.如果本地还有其他例如博客的 Web 服务器需要穿透,请再分配例如 www.yourname.com 或 blog.yourname.com 的二级域名来使用.

```
[nas_yourdomain_com_http]
#服务名称 : 重点参数,此处为该条穿透服务的名称,必须修改,且不能与其他用户重复.

type = http
#协议类型 : 确保本条穿透服务使用此协议能够在内网正常使用或访问.例如,尝试在本地访问 http://内网 IP:内网端口 确保能够正常浏览.

local_ip = 192.168.1.4
#内网 IP : 本地服务所在设备的内网 IP 地址.由于 frp 客户端有可能安装在 docker 容器中,所以请不要使用 127.0.0.1 来表示本机 IP.

local_port = 5000
#本地端口 : 本地服务的端口号.例如群晖 NAS 的 HTTP 管理端口号为 5000.

custom_domains = nas.yourdomain.com
#自定义域名 : 为本条穿透服务提供的域名,请确保在域名服务商后台将该域名的 CNAME 指向 frps.20081122.xyz
#重点提示 : 当 type = http 或者 https 协议时, custom_domains 必须设置.
```

```
[nas_yourdomain_com_https]
#服务名称 : 此处为该条穿透服务的名称,必须修改,且不能与其他用户重复.

type = https
#协议类型 : 确保本条穿透服务使用此协议能够在内网正常使用或访问.例如,尝试在本地访问 https://内网 IP:内网端口 确保能够正常浏览.

local_ip = 192.168.1.4
#内网 IP : 本地服务所在设备的内网 IP 地址.由于 frp 客户端有可能安装在 docker 容器中,所以请不要使用 127.0.0.1 来表示本机 IP.

local_port = 5001
#本地端口 : 本地服务的端口号.例如群晖 NAS 的 HTTPS 管理端口号为 5001.

custom_domains = nas.yourdomain.com
#自定义域名 : 为本条穿透服务提供的域名,请确保在域名服务商后台将该域名的 CNAME 指向 frps.20081122.xyz
#重点提示 : 当 type = http 或者 https 协议时, custom_domains 必须设置.
```

```
[yourname_linux_ssh]
#服务名称 : 重点参数,此处为该条穿透服务的名称,必须修改,且不能与其他用户重复.

type = tcp
#协议类型 : 确保本条穿透服务使用此协议能够在内网正常使用或访问.例如,尝试在本地终端执行 ssh root@192.168.1.5 确保能够正常登录.

local_ip = 192.168.1.4
#内网 IP : 本地服务所在设备的内网 IP 地址.由于 frp 客户端有可能安装在 docker 容器中,所以请不要使用 127.0.0.1 来表示本机 IP.

local_port = 22
#本地端口 : 本地服务的端口号.例如,本地 linux 服务器的默认 SSH 登录端口为 22.

remote_port = 22222
#远程端口 : 远程服务的端口号.自定义填写一个远程服务端口号,例如 22222 ,成功连接后,可以使用 ssh -p 22222 root@frps.20081122.xyz 来远程登录你的内网 Linux 服务器.
#重点提示 : 当 type = tcp 时,无需配置上文的两条域名记录,可以直接使用 frp 服务器的地址作为域名,也可以将自己的域名 CNAME 指向 frps.20081122.xyz.
```

```
[yourname_windows10_rdp]
#服务名称 : 重点参数,此处为该条穿透服务的名称,必须修改,且不能与其他用户重复.

type = tcp
#协议类型 : 确保本条穿透服务使用此协议能够在内网正常使用或访问.例如,尝试在本地使用 Microsoft Remote Desktop 来远程访问该电脑,确保能够正常登录.

local_ip = 192.168.1.6
#内网 IP : 本地服务所在设备的内网 IP 地址.由于 frp 客户端有可能安装在 docker 容器中,所以请不要使用 127.0.0.1 来表示本机 IP.

local_port = 3389
#本地端口 : 本地服务的端口号.例如,本地 Windows 的默认远程访问端口为 3389.

remote_port = 33333
#远程端口 : 远程服务的端口号.自定义填写一个远程服务端口号,例如 33333 ,成功连接后,可以使用 Microsoft Remote Desktop 将地址填写为 frps.20081122.xyz:33333 来远程登录你的内网 Windows.
#重点提示 : 当 type = tcp 时,无需配置上文的两条域名记录,可以直接使用 frp 服务器的地址作为域名,也可以将自己的域名 CNAME 指向 frps.20081122.xyz.
```
