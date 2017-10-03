export class Utils {
    /**
     * オブジェクトマッピング処理<br />
     * 指定されたクラスにターゲットオブジェクトより値をマッピングして返却する。<br />
     * @param resultClass マッピングするクラス
     * @param target マッピング元のオブジェクト
     * @param firstSort firstSortモード（true：内部的に初期データ順保持のための連番を付与する、false：連番を付与しない[高速]）
     */
    public static map(src: any, dest: any, firstSort: Boolean = true): any {
        if (typeof (src) === 'object') {
            if (src === null) {
                // null
                dest = src;
            } else {
                let properties: string[];
                properties = Object.getOwnPropertyNames(src);
                for (const prop of properties) {
                    if (typeof (src[prop]) === 'object') {
                        if (dest[prop]) {
                        } else {
                            // destがnullの場合
                            if (src[prop] === null) {
                                // srcがnullの場合
                            } else {
                                dest[prop] = {};
                            }
                        }
                        Utils.map(src, dest, firstSort);
                    } else {
                        dest[prop] = src[prop];
                    }
                }
            }
        } else if (dest) {
            // literal
            dest = src;
        } else {
            // undefined
            dest = src;
        }
        return dest;
    }
}
