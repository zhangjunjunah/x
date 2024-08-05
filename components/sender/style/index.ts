import { unit } from '@ant-design/cssinjs';
import { mergeToken } from '@ant-design/cssinjs-utils';
import { genStyleHooks } from '../../theme/genStyleUtils';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/cssinjs-utils';

export interface ComponentToken {
  //
}

interface SenderToken extends FullToken<'Sender'> {
  SenderContentMaxWidth: number | string;
}

const genSenderStyle: GenerateStyle<SenderToken> = (token) => {
  const {
    componentCls,
    paddingXS,
    paddingXXS,
    colorTextTertiary,
    colorTextSecondary,
    zIndexPopupBase,
    boxShadowSecondary,
  } = token;
  return {
    [componentCls]: {
      position: 'relative',
      display: 'flex',
      width: '100%',

      [`& ${componentCls}-actions-list`]: {
        borderRadius: '8px',
        position: 'absolute',
        zIndex: zIndexPopupBase + 1000,
        right: '8px',
        bottom: `${paddingXS-paddingXXS}px`,
      },

      [`& ${componentCls}-actions-btn`]: {

        color: colorTextTertiary,
        [`&:hover`]: {
          color: colorTextSecondary,
        },
      },
      [`& ${componentCls}-inputarea`]: {
        position: 'sticky',
        zIndex: zIndexPopupBase,
        fontSize: token.fontSize,
        bottom: 0,
        borderRadius: '8px',
        boxShadow: boxShadowSecondary,
        paddingTop: paddingXS,
        paddingBottom: paddingXS,
      },
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Sender'> = () => ({});

export default genStyleHooks<'Sender'>(
  'Sender',
  (token) => {
    const { paddingXS, calc } = token;
    const SenderToken = mergeToken<SenderToken>(token, {
      SenderContentMaxWidth: `calc(100% - ${unit(calc(paddingXS).add(32).equal())})`,
    });
    return genSenderStyle(SenderToken);
  },
  prepareComponentToken,
);
