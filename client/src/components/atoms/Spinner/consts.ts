import { ClipLoader, PulseLoader, HashLoader, BarLoader, BeatLoader } from 'react-spinners';
import { SpinnerVariant } from './types';
import colors from './Spinner.module.scss';

export const DEFAULT_COLOR = colors.primary;

export const SPINNER_COMPONENTS = {
  default: ClipLoader,
  dots: PulseLoader,
  hash: HashLoader,
  bar: BarLoader,
  beat: BeatLoader,
};

export const DEFAULT_SIZES: Record<SpinnerVariant, number> = {
  default: 35,
  dots: 10,
  hash: 40,
  bar: 100,
  beat: 10,
};
