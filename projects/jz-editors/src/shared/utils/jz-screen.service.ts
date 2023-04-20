import { EventEmitter, Injectable, Output } from '@angular/core';

enum Breakpoints {
  SMALL = 600,
  MEDIUM = 900,
  LARGE = 1200,
}

/** Tamanhos de tela disponíveis. */
export type JZScreenSizesType = 'small' | 'medium' | 'large' | 'x-large';

@Injectable({ providedIn: 'root' })
export class JZScreenService {
  /** Controla o evento 'changed'. */
  private _changed = new EventEmitter();
  /** Todos os tamanhos. O atual está como 'true'. */
  private _sizes: JZScreenSizes;
  /** O tamanho atual. */
  private _currentSize: JZScreenSizesType;

  /** Executado sempre que o tamanho da tela é alterado. */
  @Output() changed = this._changed.asObservable();

  /** Constructor */
  constructor() {
    this._setSizes();
    this._setCurrentSize();

    window.addEventListener('resize', () => {
      this._setSizes();
      this._setCurrentSize();
      this._changed.next(null);
    });
  }

  /** Retorna todos os tamanhos. O atual está como 'true'. */
  get sizes(): JZScreenSizes {
    return this._sizes;
  }

  /** Retorna o tamanho atual da tela. */
  get currentSize(): JZScreenSizesType {
    return this._currentSize;
  }

  /** Retorna os tamanhos conforme a largura (width) especificado. */
  private _getSizes(width: number): JZScreenSizes {
    return {
      small: width < Breakpoints.SMALL,
      medium: width >= Breakpoints.SMALL && width < Breakpoints.MEDIUM,
      large: width >= Breakpoints.MEDIUM && width < Breakpoints.LARGE,
      xLarge: width > Breakpoints.LARGE,
    };
  }

  /** Retorna qual é o tamanho atual conforme os tamanhos especificados. */
  private _getCurrentSize(sizes: JZScreenSizes): JZScreenSizesType {
    if (sizes.small) return 'small';
    if (sizes.large) return 'large';
    if (sizes.medium) return 'medium';

    // sizes.xLarge
    return 'x-large';
  }

  /** Defines os tamanhos */
  private _setSizes() {
    this._sizes = this._getSizes(window.innerWidth);
  }

  /** Define o tamanho atual. */
  private _setCurrentSize() {
    this._currentSize = this._getCurrentSize(this.sizes);
  }
}

export interface JZScreenSizes {
  /** Está no Mobile. */
  small: boolean;
  /** Esta no Table. */
  medium: boolean;
  /** Esta no Desktop. */
  large: boolean;
  /** Esta a cima do Desktop. */
  xLarge: boolean;
}
