import { CDN, IMG_BASE_URL } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { DialogContent, DialogTitle, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { EditorModel } from '../EditorModel'


const DialogTitleS = muiStyled(DialogTitle)({
  padding: 12,
  paddingTop: 0,
})

const Img = styled.img`
  width: 50px;
  padding: 5px;
`

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

interface Props {
  editor: EditorModel
  handleClose: () => void
}

type StickerType = 'cc98' | 'ac' | 'mahjong' | 'tb' | 'ms' | 'em'


// TODO: refactor with UBB
function getStickerReactNode(type: StickerType, handleFunc: Function, useCDN: boolean) {
  //麻将脸系列
  const mohjong = {
    //动物系列只用16个，o(1)......
    animal: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016'].map((item) => (<Img
      key={`[a:${item}]`}
      src={useCDN ? CDN(`${IMG_BASE_URL}/mahjong/animal2017/${item}.png`, false) : `${IMG_BASE_URL}/mahjong/animal2017/${item}.png`}
      onClick={handleFunc(`[a:${item}]`)}
    ></Img>)),
    //卡通系列10个，同样o(1)......
    carton: ['003.png', '018.gif', '019.png', '046.png', '049.gif', '059.png', '096.gif', '134.png', '189.png', '217.png'].map((item) => (<Img
      key={`[c:${item.slice(0, 3)}]`}
      src={useCDN ? CDN(`${IMG_BASE_URL}/mahjong/carton2017/${item}`, false) : `${IMG_BASE_URL}/mahjong/carton2017/${item}`}
      onClick={handleFunc(`[c:${item.slice(0, 3)}]`)}
    ></Img>)),
    //其他表情三位数，从1算起，index+1
    face: new Array(208).fill(0).map((item, index) => {
      //小于10的加两个0
      if (index < 9) { return `00${index + 1}`; }
      //小于100的加一个0
      else if (index < 99) { return `0${index + 1}`; }
      //其余默认
      else { return `${index + 1}` }
    }).map((item, index) => {
      //处理后缀为gif的表情，o(1)......
      if ([4, 9, 56, 61, 62, 87, 115, 120, 137, 168, 169, 175, 206].indexOf(index + 1) !== -1) { return `${item}.gif`; }
      else { return `${item}.png`; }
    }).map((item) => (<Img
      key={`[f:${item.slice(0, 3)}]`}
      src={useCDN ? CDN(`${IMG_BASE_URL}/mahjong/face2017/${item}`, false) : `${IMG_BASE_URL}/mahjong/face2017/${item}`}
      onClick={handleFunc(`[f:${item.slice(0, 3)}]`)}
    ></Img>))
  }

  const getCC98EmojiSource = (id: string) => {
    let url = `${IMG_BASE_URL}/CC98/CC98${id}.gif`
    //CC9815 - CC9830 为PNG格式
    if (Number(id) > 14 && Number(id) < 31) {
      url = `${IMG_BASE_URL}/CC98/CC98${id}.png`
    }
    //CC9836 - CC9837 为PNG格式
    if (Number(id) > 35) {
      url = `${IMG_BASE_URL}/CC98/CC98${id}.png`
    }
    return url
  }
  //基本同上
  const emoji: { [key in StickerType]: (JSX.Element | null)[] } = {
    'cc98': new Array(37).fill(0)
      .map((item, index) => {
        if (index < 9) {
          return `0${index + 1}`;
        } else {
          return `${index + 1}`;
        }
      })
      .map((item) => (
        item ? (<Img
          key={`[CC98${item}]`}
          src={useCDN ? CDN(getCC98EmojiSource(item), false) : getCC98EmojiSource(item)}
          onClick={handleFunc(`[CC98${item}]`)}
        ></Img>) : null
      )),
    'em': new Array(92).fill(0)
      .map((item, index) => {
        if (index < 10) {
          return `0${index}`;
        } else if ((index < 44) || (70 < index && index < 92)) {
          return `${index}`;
        }
      })
      .map((item) => (
        item ? (<Img
          key={`[em${item}]`}
          src={useCDN ? CDN(`${IMG_BASE_URL}/em/em${item}.gif`, false) : `${IMG_BASE_URL}/em/em${item}.gif`}
          onClick={handleFunc(`[em${item}]`)}
        ></Img>) : null
      )),
    'ac': new Array(149).fill(0)
      .map((item, index) => {
        if (index < 9) { return `0${index + 1}`; }
        else if (index < 54) { return `${index + 1}`; }
        else if (index < 94) { return `${index + 947}`; }
        else { return `${index + 1907}`; }
      }).map((item) => (<Img
        key={`[ac${item}]`}
        src={useCDN ? CDN(`${IMG_BASE_URL}/ac/${item}.png`, false) : `${IMG_BASE_URL}/ac/${item}.png`}
        onClick={handleFunc(`[ac${item}]`)}
      ></Img>)),
    'mahjong': [...mohjong.animal, ...mohjong.carton, ...mohjong.face],
    'tb': new Array(33).fill(0)
      .map((item, index) => {
        if (index < 9) { return `0${index + 1}`; }
        else { return `${index + 1}`; }
      }).map((item) => (<Img
        key={`[tb${item}]`}
        src={useCDN ? CDN(`${IMG_BASE_URL}/tb/tb${item}.png`, false) : `${IMG_BASE_URL}/tb/tb${item}.png`}
        onClick={handleFunc(`[tb${item}]`)}
      ></Img>)),
    'ms': new Array(54).fill(0)
      .map((item, index) => {
        if (index < 9) { return `0${index + 1}`; }
        else { return `${index + 1}`; }
      })
      .map((item) => <Img
        key={`ms${item}`}
        src={useCDN ? CDN(`${IMG_BASE_URL}/ms/ms${item}.png`, false) : `${IMG_BASE_URL}/ms/ms${item}.png`}
        onClick={handleFunc(`ms${item}`)}
      />)
  }
  return emoji[type]
}

export default ({ editor, handleClose }: Props) => {
  const { useCDN } = useModel(settingModel, ['useCDN'])
  const [type, setType] = useState<StickerType>('cc98')

  const handleChange = (_: React.ChangeEvent, value: StickerType) => {
    setType(value)
  }

  const handleClick = (stickerCode: string) => (_: React.MouseEvent<HTMLImageElement>) => {
    editor.appendMainContent(`${stickerCode}`)
    handleClose()
  }

  const StickerArr = getStickerReactNode(type, handleClick, useCDN)

  return (
    <>
      <DialogTitleS>
        <Tabs
          value={type}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
        >
          <Tab value="cc98" label="CC98" />
          <Tab value="ac" label="AC娘" />
          <Tab value="mahjong" label="麻将脸" />
          <Tab value="tb" label="贴吧" />
          <Tab value="ms" label="雀魂" />
          <Tab value="em" label="经典" />
        </Tabs>
      </DialogTitleS>

      <DialogContent>
        <FlexDiv>{StickerArr}</FlexDiv>
      </DialogContent>
    </>
  )
}
