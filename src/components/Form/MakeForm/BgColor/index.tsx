import React, { useEffect, useMemo, useState } from 'react';
import { BgColorWrapper } from './styles';
import { ColorPicker } from 'antd';
import type { Color, ColorPickerProps } from 'antd/es/color-picker';
import { useRecoilState } from 'recoil';
import { FormBgColor } from '../../../../recoil/MakeForm/atom';

export default function BgColor() {
  const [colorHex, setColorHex] = useState<Color | string>('#ffffff');
  const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');
  const [color, setColor] = useRecoilState(FormBgColor);

  const hexString = useMemo(() => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()), [colorHex]);

  useEffect(() => {
    setColor(hexString);
  }, [colorHex]);

  return (
    <BgColorWrapper>
      <span>배경색</span>
      <ColorPicker format={formatHex} value={colorHex} onChange={setColorHex} onFormatChange={setFormatHex} />
    </BgColorWrapper>
  );
}
