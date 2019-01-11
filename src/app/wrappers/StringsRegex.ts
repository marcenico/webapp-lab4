export class StringsRegex {
    public static onlyNumbers: string = '^[0-9]+$';
    public static cuit: string = "^[0-9]{2}-[0-9]{8}-[0-9]$";
    public static latitude: string = "^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$";
    public static longitude: string = '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$';

}
