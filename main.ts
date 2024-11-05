import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
import { openKv } from "npm:@deno/kv@0.7.0";
// const kv = await openKv();
const kv = await openKv("https://api.deno.com/databases/ef396a4b-4d06-4cb9-acfc-80ddce18122c/connect",
  { accessToken: "ddp_nySUNMwtEIDnrZ61kJGOdmfNd7OgXB3BTz3q" },);

const app = new Hono()
app.use('/*', serveStatic({ root: './static/' }))

app.post('/api/login', async (c) => {
  const { username, password } = await c.req.json<{username: string, password: string}>();
  const result = await kv.get(["login", username, password]);
  
  // 检查是否找到匹配的用户凭证
  if (!result.value) {
    return c.json({ success: false, message: "用户名或密码错误" }, 401);
  }
  
  return c.json({ success: true, data: result.value });
})

app.post('/api/register', async (c) => {
  const { username, password } = await c.req.json<{username: string, password: string}>();
  
  // 检查用户名是否已存在
  const existingUser = await kv.get(["login", username]);
  if (existingUser.value) {
    return c.json({ success: false, message: "用户名已存在" }, 400);
  }
  
  // 存储新用户
  await kv.set(["login", username, password], { username });
  return c.json({ success: true, message: "注册成功" });
})

app.get('/api/users/:username', async (c) => {
  const username = c.req.param('username');
  
  // 查询用户信息
  const userInfo = await kv.get(["login", username]);
  if (!userInfo.value) {
    return c.json({ success: false, message: "用户不存在" }, 404);
  }
  
  return c.json({ success: true, data: userInfo.value });
})

Deno.serve(app.fetch)
