FROM ubuntu:16.04

RUN apt-get update \
&& apt-get install -y python2.7 \
    nodejs \
    build-essential \
    cmake \
    git-core \
    default-jre \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/bin/python2.7 /usr/bin/python
RUN git clone https://github.com/juj/emsdk.git /root/work

WORKDIR /root/work

RUN ./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
RUN ./emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit

# CMD ["source" "./emsdk_env.sh"]
