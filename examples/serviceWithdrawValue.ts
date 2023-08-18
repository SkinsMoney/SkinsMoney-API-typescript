import SkinsMoney from "../src";

(async () => {
    const skinsmoney = new SkinsMoney();
    const deposit = skinsmoney.service("SERVICE_ID", "SERVICE_HASH");
    const value = await deposit.getWithdrawValue();
    console.log(value);
})();