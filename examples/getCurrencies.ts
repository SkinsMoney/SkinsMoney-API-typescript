import SkinsMoney from "../src";

(async () => {
    const skinsmoney = new SkinsMoney();
    const currencies = await skinsmoney.currencies().get();
    console.log(currencies);
})();