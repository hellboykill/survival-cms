const HostConfig = {
  product_url: "http://34.105.211.203:8000/api",
  product_ip: "34.105.211.203",
  test_url: "http://localhost:8000/api",
  test_ip: "localhost"
}

export default {
  server_url: HostConfig.product_url,
  ip_adress: HostConfig.product_ip,

  prefix_mail: '/mail',
  prefix_user: '/user',
  prefix_pvp: '/pvp',

  url_login: '/login',

  url_mailsytem: "/mailSystem",
  url_mailupdate: "/mailUpdate",
  url_mailreward: "/mailReward",

  url_mailDetail: "/mailDetail",
  
  url_reloadMail: "/reloadConfig",
  url_config: "/config",
  url_leaderboard: "/leaderboard",

  port_listener: 50000,
  default_router: "/mail/system"
};
