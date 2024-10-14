import React from 'react'
import { Divider, Tag } from 'antd';




export default function tags() {


    return (
        <div>
            <div id="cateListBox"  >
                <div class="hd"><i class="icn"></i></div>
                <div class="bd">
                    <h3><a href="/discover/playlist/" data-cat="全部"><em>全部风格</em></a></h3>
                    <dl class="f-cb">
                        <dt><i class="u-icn u-icn-71"></i>语种</dt>
                        <dd>
                            <Tag color="volcano"><a href="/discover/playlist/?cat=%E5%8D%8E%E8%AF%AD" data-cat="华语">华语</a></Tag><span class="line">    </span>
                            <Tag color="magenta"><a href="/discover/playlist/?cat=%E6%AC%A7%E7%BE%8E" data-cat="欧美">欧美</a></Tag><span class="line">    </span>
                            <Tag color="magenta"
                            ><a href="/discover/playlist/?cat=日语" data-cat="日语">日语</a></Tag><span class="line">    </span>
                            <Tag color="orange"><a href="/discover/playlist/?cat=%E9%9F%A9%E8%AF%AD" data-cat="韩语">韩语</a></Tag><span class="line">    </span>
                            <Tag color="gold"> <a href="/discover/playlist/?cat=%E7%B2%A4%E8%AF%AD" data-cat="粤语">粤语</a></Tag><span class="line">    </span>
                        </dd>
                    </dl>
                    <dl class="f-cb">
                        <dt><i class="u-icn u-icn-6"></i>风格</dt>
                        <dd>
                            <Tag color="lime"><a href="/discover/playlist/?cat=%E6%B5%81%E8%A1%8C" data-cat="流行">流行</a></Tag><span class="line">    </span>
                            <Tag color="green"><a href="/discover/playlist/?cat=%E6%91%87%E6%BB%9A" data-cat="摇滚">摇滚</a></Tag><span class="line">    </span>
                            <Tag color="cyan"><a href="/discover/playlist/?cat=%E6%B0%91%E8%B0%A3" data-cat="民谣">民谣</a></Tag><span class="line">    </span>
                            <Tag color="blue"><a href="/discover/playlist/?cat=%E7%94%B5%E5%AD%90" data-cat="电子">电子</a></Tag><span class="line">    </span>
                            <Tag color="geekblue"><a href="/discover/playlist/?cat=%E8%88%9E%E6%9B%B2" data-cat="舞曲">舞曲</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=%E8%AF%B4%E5%94%B1" data-cat="说唱">说唱</a></Tag><span class="line">    </span>
                            <Tag color="magenta"><a href="/discover/playlist/?cat=%E8%BD%BB%E9%9F%B3%E4%B9%90" data-cat="轻音乐">轻音乐</a></Tag><span class="line">    </span>
                            <Tag color="orange"><a href="/discover/playlist/?cat=%E7%88%B5%E5%A3%AB" data-cat="爵士">爵士</a></Tag><span class="line">    </span>
                            <Tag color="lime"><a href="/discover/playlist/?cat=%E4%B9%A1%E6%9D%91" data-cat="乡村">乡村</a></Tag><span class="line">    </span>
                            <Tag color="gold"><a href="/discover/playlist/?cat=R%26B%2FSoul" data-cat="R&amp;B/Soul">R&amp;B/Soul</a></Tag><span class="line">    </span>
                            <Tag color="green"><a href="/discover/playlist/?cat=%E5%8F%A4%E5%85%B8" data-cat="古典">古典</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=%E6%B0%91%E6%97%8F" data-cat="民族">民族</a></Tag><span class="line">    </span>
                            <Tag color="cyan"><a href="/discover/playlist/?cat=%E8%8B%B1%E4%BC%A6" data-cat="英伦">英伦</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=%E9%87%91%E5%B1%9E" data-cat="金属">金属</a></Tag><span class="line">    </span>
                            <Tag color="blue"><a href="/discover/playlist/?cat=%E6%9C%8B%E5%85%8B" data-cat="朋克">朋克</a></Tag><span class="line">    </span>
                            <Tag color="magenta"><a href="/discover/playlist/?cat=%E8%93%9D%E8%B0%83" data-cat="蓝调">蓝调</a></Tag><span class="line">    </span>
                            <Tag color="orange"><a href="/discover/playlist/?cat=%E9%9B%B7%E9%AC%BC" data-cat="雷鬼">雷鬼</a></Tag><span class="line">    </span>
                            <Tag color="lime"><a href="/discover/playlist/?cat=%E4%B8%96%E7%95%8C%E9%9F%B3%E4%B9%90" data-cat="世界音乐">世界音乐</a></Tag><span class="line">    </span>
                            <Tag color="gold"><a href="/discover/playlist/?cat=%E6%8B%89%E4%B8%81" data-cat="拉丁">拉丁</a></Tag><span class="line">    </span>
                            <Tag color="green"><a href="/discover/playlist/?cat=New%20Age" data-cat="New Age">New Age</a></Tag><span class="line">    </span>
                            <Tag color="green"><a href="/discover/playlist/?cat=%E5%8F%A4%E9%A3%8E" data-cat="古风">古风</a></Tag><span class="line">    </span>
                            <Tag color="geekblue"><a href="/discover/playlist/?cat=%E5%90%8E%E6%91%87" data-cat="后摇">后摇</a></Tag><span class="line">    </span>
                        </dd>
                    </dl>
                    <dl class="f-cb">
                        <dt><i class="u-icn u-icn-7"></i>场景</dt>
                        <dd>
                            <Tag color="blue"><a href="/discover/playlist/?cat=%E6%B8%85%E6%99%A8" data-cat="清晨">清晨</a></Tag><span class="line">    </span>
                            <Tag color="cyan"><a href="/discover/playlist/?cat=%E5%A4%9C%E6%99%9A" data-cat="夜晚">夜晚</a></Tag><span class="line">    </span>
                            <Tag color="blue"><a href="/discover/playlist/?cat=%E5%AD%A6%E4%B9%A0" data-cat="学习">学习</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=%E5%B7%A5%E4%BD%9C" data-cat="工作">工作</a></Tag><span class="line">    </span>
                            <Tag color="magenta"><a href="/discover/playlist/?cat=%E5%8D%88%E4%BC%91" data-cat="午休">午休</a></Tag><span class="line">    </span>
                            <Tag color="orange"><a href="/discover/playlist/?cat=%E4%B8%8B%E5%8D%88%E8%8C%B6" data-cat="下午茶">下午茶</a></Tag><span class="line">    </span>
                            <Tag color="lime"><a href="/discover/playlist/?cat=%E5%9C%B0%E9%93%81" data-cat="地铁">地铁</a></Tag><span class="line">    </span>
                            <Tag color="gold"><a href="/discover/playlist/?cat=%E9%A9%BE%E8%BD%A6" data-cat="驾车">驾车</a></Tag><span class="line">    </span>
                            <Tag color="green"><a href="/discover/playlist/?cat=%E8%BF%90%E5%8A%A8" data-cat="运动">运动</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=%E6%97%85%E8%A1%8C" data-cat="旅行">旅行</a></Tag><span class="line">    </span>
                            <Tag color="cyan"><a href="/discover/playlist/?cat=%E6%95%A3%E6%AD%A5" data-cat="散步">散步</a></Tag><span class="line">    </span>
                            <Tag color="blue"><a href="/discover/playlist/?cat=%E9%85%92%E5%90%A7" data-cat="酒吧">酒吧</a></Tag><span class="line">    </span>
                        </dd>
                    </dl>
                    <dl class="f-cb">
                        <dt><i class="u-icn u-icn-8"></i>情感</dt>
                        <dd>
                            <Tag color="blue"><a href="/discover/playlist/?cat=%E6%80%80%E6%97%A7" data-cat="怀旧">怀旧</a></Tag><span class="line">    </span>
                            <Tag color="cyan"><a href="/discover/playlist/?cat=%E6%B8%85%E6%96%B0" data-cat="清新">清新</a></Tag><span class="line">    </span>
                            <Tag color="magenta"><a href="/discover/playlist/?cat=%E6%B5%AA%E6%BC%AB" data-cat="浪漫">浪漫</a></Tag><span class="line">    </span>
                            <Tag color="orange"><a href="/discover/playlist/?cat=%E4%BC%A4%E6%84%9F" data-cat="伤感">伤感</a></Tag><span class="line">    </span>
                            <Tag color="gold"><a href="/discover/playlist/?cat=%E6%B2%BB%E6%84%88" data-cat="治愈">治愈</a></Tag><span class="line">    </span>
                            <Tag color="blue"><a href="/discover/playlist/?cat=%E6%94%BE%E6%9D%BE" data-cat="放松">放松</a></Tag><span class="line">    </span>
                            <Tag color="lime"><a href="/discover/playlist/?cat=%E5%AD%A4%E7%8B%AC" data-cat="孤独">孤独</a></Tag><span class="line">    </span>
                            <Tag color="green"><a href="/discover/playlist/?cat=%E6%84%9F%E5%8A%A8" data-cat="感动">感动</a></Tag><span class="line">    </span>
                            <Tag color="geekblue"><a href="/discover/playlist/?cat=%E5%85%B4%E5%A5%8B" data-cat="兴奋">兴奋</a></Tag><span class="line">    </span>
                            <Tag color="geekblue"><a href="/discover/playlist/?cat=%E5%BF%AB%E4%B9%90" data-cat="快乐">快乐</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=%E5%AE%89%E9%9D%99" data-cat="安静">安静</a></Tag><span class="line">    </span>
                            <Tag color="blue"><a href="/discover/playlist/?cat=%E6%80%9D%E5%BF%B5" data-cat="思念">思念</a></Tag><span class="line">    </span>
                        </dd>
                    </dl>
                    <dl class="f-cb">
                        <dt><i class="u-icn u-icn-9"></i>主题</dt>
                        <dd class="last">
                            <Tag color="cyan"><a href="/discover/playlist/?cat=%E7%BB%BC%E8%89%BA" data-cat="综艺">综艺</a></Tag><span class="line">    </span>
                            <Tag color="magenta"><a href="/discover/playlist/?cat=%E5%BD%B1%E8%A7%86%E5%8E%9F%E5%A3%B0" data-cat="影视原声">影视原声</a></Tag><span class="line">    </span>
                            <Tag color="orange"><a href="/discover/playlist/?cat=ACG" data-cat="ACG">ACG</a></Tag><span class="line">    </span>
                            <Tag color="green"><a href="/discover/playlist/?cat=%E5%84%BF%E7%AB%A5" data-cat="儿童">儿童</a></Tag><span class="line">    </span>
                            <Tag color="gold"><a href="/discover/playlist/?cat=%E6%A0%A1%E5%9B%AD" data-cat="校园">校园</a></Tag><span class="line">    </span>
                            <Tag color="lime"><a href="/discover/playlist/?cat=%E6%B8%B8%E6%88%8F" data-cat="游戏">游戏</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=70%E5%90%8E" data-cat="70后">70后</a></Tag><span class="line">    </span>
                            <Tag color="geekblue"><a href="/discover/playlist/?cat=80%E5%90%8E" data-cat="80后">80后</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=90%E5%90%8E" data-cat="90后">90后</a></Tag><span class="line">    </span>
                            <Tag color="blue"><a href="/discover/playlist/?cat=%E7%BD%91%E7%BB%9C%E6%AD%8C%E6%9B%B2" data-cat="网络歌曲">网络歌曲</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=KTV" data-cat="KTV">KTV</a></Tag><span class="line">    </span>
                            <Tag color="geekblue"><a href="/discover/playlist/?cat=%E7%BB%8F%E5%85%B8" data-cat="经典">经典</a></Tag><span class="line">    </span>
                            <Tag color="purple"><a href="/discover/playlist/?cat=%E7%BF%BB%E5%94%B1" data-cat="翻唱">翻唱</a></Tag><span class="line">    </span>
                            <Tag color="magenta"><a href="/discover/playlist/?cat=%E5%90%89%E4%BB%96" data-cat="吉他">吉他</a></Tag><span class="line">    </span>
                            <Tag color="orange"><a href="/discover/playlist/?cat=%E9%92%A2%E7%90%B4" data-cat="钢琴">钢琴</a></Tag><span class="line">    </span>
                            <Tag color="lime"><a href="/discover/playlist/?cat=%E5%99%A8%E4%B9%90" data-cat="器乐">器乐</a></Tag><span class="line">    </span>
                            <Tag color="gold"><a href="/discover/playlist/?cat=%E6%A6%9C%E5%8D%95" data-cat="榜单">榜单</a></Tag><span class="line">    </span>
                            <Tag color="magenta"><a href="/discover/playlist/?cat=00%E5%90%8E" data-cat="00后">00后</a></Tag><span class="line">    </span>
                        </dd>
                    </dl>
                </div>
                <div class="ft"></div>
            </div>


        </div>
    )
}
