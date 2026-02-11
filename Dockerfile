
# 基础镜像
FROM nginx
# 作者
MAINTAINER zhanghuijun <zhanghuijun@portjs.cn>
# VOLUME 指定了临时文件目录为/tmp。
# 将文件中的内容复制到 /usr/share/nginx/html/ 这个目录下
COPY production/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

