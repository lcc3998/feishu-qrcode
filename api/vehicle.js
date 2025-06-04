export default async function handler(req, res) {
  const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
  const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;

  const authRes = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: FEISHU_APP_ID,
      app_secret: FEISHU_APP_SECRET
    })
  });

  const tokenJson = await authRes.json();
  console.log("Token response:", tokenJson);

  if (tokenJson.code !== 0) {
    return res.status(500).json({ error: "获取 token 失败", detail: tokenJson });
  }

  const { tenant_access_token } = tokenJson;

  const sheetToken = "shtcnWbt3nAHXlDf"; // 替换成你的
  const viewId = "vewcnmCJyT";           // 替换成你的
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${sheetToken}/tables/${viewId}/records`;

  const dataRes = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${tenant_access_token}`
    }
  });

  const json = await dataRes.json();

  if (json.code !== 0) {
    return res.status(500).json({ error: "获取表格数据失败", detail: json });
  }

  const records = json.data.items.map(item => ({
    状态: item.fields["状态"],
    车牌: item.fields["车牌"],
    二维码: item.fields["二维码"]
  }));

  res.status(200).json(records);
}
