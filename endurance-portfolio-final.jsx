import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const C = {
  gold:"#C9A84C",goldL:"#E8C97A",goldD:"#8B6914",goldXD:"#2A1F05",goldXXD:"#140E02",
  bg:"#080808",bg2:"#0F0F0F",bg3:"#141414",bg4:"#1C1C1C",
  text:"#F0EDE4",textM:"#5E5A55",textS:"#9A9590",textD:"#272420",
  border:"#1A1A1A",borderM:"#242420",white:"#FFFFFF",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${C.bg};color:${C.text};font-family:'DM Sans',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
::selection{background:${C.goldD};color:${C.text}}
::-webkit-scrollbar{width:2px}
::-webkit-scrollbar-thumb{background:${C.goldD}}

.wrap{max-width:1080px;margin:0 auto;padding:0 40px}
@media(max-width:768px){.wrap{padding:0 20px}}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:500;transition:all .3s}
.nav.scrolled{background:rgba(8,8,8,.97);backdrop-filter:blur(24px);border-bottom:1px solid ${C.border}}
.nav-inner{display:flex;justify-content:space-between;align-items:center;height:68px;gap:16px}
.brand{cursor:pointer;flex-shrink:0}
.brand-name{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:400;color:${C.text};letter-spacing:.2px}
.brand-sub{font-size:8px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:#E8C97A!important;margin-top:2px;font-family:'DM Mono',monospace}
.nav-center{display:flex;gap:0;list-style:none}
@media(max-width:700px){.nav-center{display:none}}
.nav-btn{background:none;border:none;color:#C0BDB8;font-family:'DM Mono',monospace;font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;padding:8px 14px;transition:color .2s}
.nav-btn:hover{color:${C.text}}
.nav-btn.active{color:${C.gold}}
.nav-cv{background:${C.gold};border:none;color:#000;font-family:'DM Mono',monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:9px 18px;cursor:pointer;transition:background .2s;white-space:nowrap;flex-shrink:0}
.nav-cv:hover{background:${C.goldL}}

section{padding:100px 0;border-bottom:1px solid ${C.border}}
section:last-of-type{border-bottom:none}
.eyebrow{font-size:9px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:${C.gold};margin-bottom:52px;display:flex;align-items:center;gap:16px;font-family:'DM Mono',monospace}
.eyebrow::after{content:'';flex:1;height:1px;background:${C.border}}

/* HERO */
.hero{min-height:90vh;display:grid;grid-template-columns:1fr;align-items:center;padding:120px 0 80px;position:relative;overflow:hidden;border-bottom:1px solid ${C.border}}
@media(max-width:768px){.hero{padding:100px 0 60px;min-height:auto}}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 65% 55% at 60% 40%,${C.goldXXD} 0%,transparent 60%),radial-gradient(ellipse 40% 35% at 10% 80%,#0D0A03 0%,transparent 50%);pointer-events:none}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px);background-size:80px 80px;opacity:.2;pointer-events:none}
.hero-left{position:relative;z-index:1}
.hero-pre{font-size:9px;font-weight:600;letter-spacing:5px;text-transform:uppercase;color:${C.gold};margin-bottom:32px;display:flex;align-items:center;gap:14px;font-family:'DM Mono',monospace}
.hero-pre::before{content:'';width:32px;height:1px;background:${C.gold};flex-shrink:0}
.hero-h{font-family:'Cormorant Garamond',serif;margin-bottom:28px;line-height:.92}
.hero-fullname{display:block;font-size:clamp(52px,8vw,96px);font-weight:600;color:${C.gold};letter-spacing:-1px}
.hero-pref{display:block;font-size:clamp(52px,8vw,96px);font-weight:300;font-style:italic;color:#FFFFFF;letter-spacing:-1px}
.hero-role{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#E8C97A!important;margin-bottom:24px;font-family:'DM Mono',monospace}
.hero-bio{max-width:640px;font-size:14px;line-height:1.9;color:#FFFFFF;margin-bottom:40px;font-weight:300}
.hero-ctas{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:72px}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid ${C.border};gap:1px;background:${C.border}}
@media(max-width:520px){.stats{grid-template-columns:repeat(2,1fr)}}
.stat{background:${C.bg};padding:22px 14px;text-align:center}
.stat-v{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:400;color:${C.gold};line-height:1}
.stat-l{font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#FFFFFF;margin-top:7px;font-family:'DM Mono',monospace}



/* LEFT MOBILE DRAWER */
.mobile-drawer{position:fixed;top:0;left:-280px;width:280px;height:100vh;background:#0F0F0F;border-right:1px solid #1A1A1A;z-index:999;transition:left .3s ease;padding:24px;display:flex;flex-direction:column;gap:20px}
.mobile-drawer.open{left:0}
.drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:998;opacity:0;pointer-events:none;transition:opacity .3s ease}
.drawer-overlay.open{opacity:1;pointer-events:auto}
.drawer-close{align-self:flex-end;background:none;border:none;color:#F0EDE4;font-size:24px;cursor:pointer}
.drawer-links{display:flex;flex-direction:column;gap:16px;list-style:none}
.drawer-btn{background:none;border:none;color:#9A9590;font-family:'DM Mono',monospace;font-size:14px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;width:100%;text-align:left;padding:10px 0;border-bottom:1px solid #1A1A1A}
.drawer-btn:hover{color:#C9A84C}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;font-family:'DM Mono',monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border:none;transition:all .2s;line-height:1}
.btn-gold{background:${C.gold};color:#000}
.btn-gold:hover{background:${C.goldL};transform:translateY(-1px)}
.btn-outline{background:transparent;color:${C.text};border:1px solid ${C.borderM}}
.btn-outline:hover{border-color:${C.gold};color:${C.gold}}
.btn-ghost{background:transparent;color:${C.gold};border:1px solid ${C.goldD};font-size:8px;padding:8px 16px}
.btn-ghost:hover{background:${C.goldXD}}
.btn-sm{padding:8px 18px;font-size:8px}
.btn:disabled{opacity:.3;cursor:not-allowed;transform:none!important}

/* ABOUT */
.about-cols{display:grid;grid-template-columns:1fr 1fr;gap:72px}
@media(max-width:768px){.about-cols{grid-template-columns:1fr;gap:40px}}
.ap{font-size:13px;line-height:2;color:#FFFFFF;margin-bottom:18px;font-weight:300}
.cred-list{display:flex;flex-direction:column;gap:6px}
.cred{display:flex;flex-direction:column;padding:14px 18px;background:${C.bg2};border:1px solid ${C.border};border-left:2px solid ${C.goldD};transition:border-left-color .2s}
.cred:hover{border-left-color:${C.gold}}
.cred-name{font-size:11px;font-weight:500;color:${C.text};margin-bottom:3px}
.cred-inst{font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:${C.gold};font-family:'DM Mono',monospace}

/* SKILLS */
.skills-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:${C.border};border:1px solid ${C.border}}
@media(max-width:900px){.skills-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:440px){.skills-grid{grid-template-columns:1fr}}
.sk{background:${C.bg2};padding:28px 22px;transition:background .2s;position:relative;text-align:left;color:${C.text};width:100%;border:none;font-family:'DM Sans',sans-serif;cursor:default}
.sk:hover{background:${C.bg3}}
.sk-num{font-size:8px;letter-spacing:3px;color:#FFFFFF;margin-bottom:16px;font-weight:500;font-family:'DM Mono',monospace}
.sk-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:400;margin-bottom:8px;line-height:1.2}
.sk-desc{font-size:10px;line-height:1.7;color:#FFFFFF;font-weight:300}
.sk-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:12px}
.sk-tag{font-size:7px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.gold};background:${C.goldXD};padding:2px 7px;font-family:'DM Mono',monospace}
.sk-badge{position:absolute;top:16px;right:16px;font-size:7px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.gold};border:1px solid ${C.goldD};padding:3px 8px;background:none;cursor:pointer;font-family:'DM Mono',monospace;transition:background .2s}
.sk-badge:hover{background:${C.goldXD}}

/* PROJECTS */
.proj-list{display:flex;flex-direction:column;gap:1px;background:${C.border};border:1px solid ${C.border}}
.proj{background:${C.bg2};transition:background .15s}
.proj:hover{background:${C.bg3}}
.proj-top{display:grid;grid-template-columns:1fr auto;gap:24px;padding:32px;align-items:start}
@media(max-width:600px){.proj-top{grid-template-columns:1fr;padding:20px}}
.ptags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.ptag{font-size:7px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.gold};border:1px solid ${C.goldD};padding:3px 9px;background:${C.goldXD};font-family:'DM Mono',monospace}
.ptitle{font-family:'Cormorant Garamond',serif;font-size:25px;font-weight:400;margin-bottom:8px;line-height:1.15}
.pdesc{font-size:12px;line-height:1.9;color:#FFFFFF;max-width:580px;font-weight:300}
.pright{display:flex;flex-direction:column;align-items:flex-end;gap:12px;flex-shrink:0}
@media(max-width:600px){.pright{align-items:flex-start;flex-direction:row;flex-wrap:wrap}}
.pstatus{display:flex;align-items:center;gap:7px;font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${C.textM};white-space:nowrap;font-family:'DM Mono',monospace}
.pdot{width:5px;height:5px;border-radius:50%;background:${C.gold};animation:pulse 2.5s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.pfoot{padding:0 32px 24px;display:flex;align-items:center}
@media(max-width:600px){.pfoot{padding:0 20px 18px}}
.pidx{margin-left:auto;font-size:9px;font-weight:400;letter-spacing:2px;color:#FFFFFF;font-family:'DM Mono',monospace}
.demo-wrap{border-top:1px solid ${C.border};background:${C.bg3};animation:reveal .3s ease}
@keyframes reveal{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}
.demo-body{padding:36px 32px}
@media(max-width:600px){.demo-body{padding:20px 18px}}

/* TOOLS */
.ttabs{display:flex;border-bottom:1px solid ${C.border};overflow-x:auto}
.ttabs::-webkit-scrollbar{display:none}
.ttab{background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;color:#C0BDB8;font-family:'DM Mono',monospace;font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;padding:12px 22px;white-space:nowrap;transition:all .2s}
.ttab.active{color:${C.gold};border-bottom-color:${C.gold}}
.tpane{background:${C.bg2};border:1px solid ${C.border};border-top:none;padding:32px}
@media(max-width:600px){.tpane{padding:18px}}

.fg{margin-bottom:16px}
.fl{display:block;font-size:8px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${C.goldL};margin-bottom:7px;font-family:'DM Mono',monospace}
.fi,.fta{width:100%;background:${C.bg};border:1px solid ${C.border};color:#FFFFFF;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:300;padding:11px 14px;outline:none;transition:border-color .2s;resize:vertical}
.fi:focus,.fta:focus{border-color:${C.goldD}}
.fi::placeholder,.fta::placeholder{color:#8A8580}
.fta{min-height:110px}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:520px){.fr{grid-template-columns:1fr}}

.msgs{height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;margin-bottom:16px;padding-right:6px}
.msgs::-webkit-scrollbar{width:2px}
.msg{display:flex;gap:14px;font-size:12px;line-height:1.8;font-weight:300}
.msg-r{font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding-top:3px;min-width:40px;font-family:'DM Mono',monospace}
.msg-r.user{color:${C.gold}}
.msg-r.ai{color:${C.gold}}
.msg-c{color:#FFFFFF;flex:1;white-space:pre-wrap;word-break:break-word}
.chat-row{display:flex;border:1px solid ${C.border}}
.chat-in{flex:1;background:${C.bg};border:none;color:#FFFFFF;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:300;padding:12px 14px;outline:none}
.chat-in::placeholder{color:#8A8580}
.chat-go{background:${C.gold};border:none;color:#000;font-family:'DM Mono',monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:12px 20px;cursor:pointer;transition:background .2s;white-space:nowrap}
.chat-go:hover{background:${C.goldL}}
.chat-go:disabled{background:${C.bg4};color:${C.textM};cursor:not-allowed}

.out{background:${C.bg};border:1px solid ${C.border};border-left:2px solid ${C.gold};padding:18px 20px;font-size:12px;line-height:1.9;color:#FFFFFF;white-space:pre-wrap;word-break:break-word;min-height:60px;max-height:360px;overflow-y:auto;margin-top:18px;font-weight:300}
.copy-btn{background:none;border:1px solid ${C.border};color:#C0BDB8;font-family:'DM Mono',monospace;font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:6px 14px;cursor:pointer;margin-top:8px;transition:all .2s}
.copy-btn:hover{border-color:${C.goldD};color:${C.gold}}

/* DCF */
.dcf-wrap{display:grid;grid-template-columns:255px 1fr;gap:20px;align-items:start}
@media(max-width:820px){.dcf-wrap{grid-template-columns:1fr}}
.panel{background:${C.bg};border:1px solid ${C.border};padding:20px}
.plbl{font-size:8px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${C.gold};margin-bottom:16px;font-family:'DM Mono',monospace}
.drow{margin-bottom:11px}
.dlbl{font-size:7px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${C.textM};display:block;margin-bottom:5px;font-family:'DM Mono',monospace}
.din{width:100%;background:${C.bg2};border:1px solid ${C.border};color:${C.text};font-family:'DM Sans',sans-serif;font-size:12px;font-weight:300;padding:7px 11px;outline:none;transition:border-color .2s}
.din:focus{border-color:${C.goldD}}
.dresults{display:flex;flex-direction:column;gap:10px}
.dmetrics{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.dmetric{background:${C.bg};border:1px solid ${C.border};padding:14px 16px}
.dmetric.hi{border-left:2px solid ${C.gold}}
.dm-l{font-size:7px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.textM};margin-bottom:5px;font-family:'DM Mono',monospace}
.dm-v{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;color:${C.gold};line-height:1}
.dm-s{font-size:8px;color:#C0BDB8;margin-top:2px;font-weight:300}
.cbox{background:${C.bg};border:1px solid ${C.border};padding:16px}
.clbl{font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.textM};margin-bottom:12px;font-family:'DM Mono',monospace}
.twrap{background:${C.bg};border:1px solid ${C.border}}
.tbl{width:100%;border-collapse:collapse;font-size:10px}
.tbl th{font-size:7px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.textM};padding:9px 12px;border-bottom:1px solid ${C.border};text-align:right;background:${C.bg2};font-family:'DM Mono',monospace}
.tbl th:first-child{text-align:left}
.tbl td{padding:7px 12px;border-bottom:1px solid ${C.border};color:#FFFFFF;text-align:right;font-weight:300}
.tbl td:first-child{text-align:left;color:#FFFFFF;font-weight:400}
.tbl tr:last-child td{color:${C.gold};font-weight:600;border-bottom:none}

/* KPI */
.kpi-top{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:${C.border};border:1px solid ${C.border};margin-bottom:10px}
@media(max-width:520px){.kpi-top{grid-template-columns:repeat(2,1fr)}}
.kcard{background:${C.bg};padding:18px 12px;text-align:center}
.kval{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:${C.gold};line-height:1;margin-bottom:4px}
.klbl{font-size:7px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FFFFFF;font-family:'DM Mono',monospace}
.kchg{font-size:9px;color:#C0BDB8;margin-top:3px;font-weight:300}
.kcharts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:580px){.kcharts{grid-template-columns:1fr}}

/* ROADMAP */
.rm-add{display:grid;grid-template-columns:1fr 120px 120px auto;gap:8px;align-items:end;margin-bottom:14px}
@media(max-width:600px){.rm-add{grid-template-columns:1fr 1fr}}
.rmsel{background:${C.bg};border:1px solid ${C.border};color:${C.text};font-family:'DM Sans',sans-serif;font-size:12px;font-weight:300;padding:10px 11px;outline:none;width:100%}
.rmsel option{background:${C.bg2}}
.rm-board{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:${C.border};border:1px solid ${C.border};min-height:180px}
@media(max-width:600px){.rm-board{grid-template-columns:repeat(2,1fr)}}
.rm-col{background:${C.bg2}}
.rm-ch{padding:10px 12px;border-bottom:1px solid ${C.border};font-size:8px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${C.gold};font-family:'DM Mono',monospace}
.rm-cb{padding:8px;display:flex;flex-direction:column;gap:5px;min-height:120px}
.rm-item{background:${C.bg};border:1px solid ${C.border};padding:9px 10px}
.rm-t{font-size:11px;font-weight:400;color:${C.text};margin-bottom:5px;line-height:1.3}
.rm-meta{display:flex;justify-content:space-between;align-items:center}
.rm-p{font-size:7px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:2px 6px;font-family:'DM Mono',monospace}
.rm-p.High{color:#E0734A;background:#2A1208;border:1px solid #5A2510}
.rm-p.Medium{color:${C.gold};background:${C.goldXD};border:1px solid ${C.goldD}}
.rm-p.Low{color:${C.textM};background:${C.bg2};border:1px solid ${C.border}}
.rm-del{background:none;border:none;color:#C0BDB8;cursor:pointer;font-size:14px;padding:0;line-height:1;transition:color .2s}
.rm-del:hover{color:${C.gold}}
.rm-empty{font-size:9px;color:#C0BDB8;text-align:center;padding:18px 0;font-family:'DM Mono',monospace}

/* EXPERIENCE */
.exp-list{display:flex;flex-direction:column}
.exp-row{display:grid;grid-template-columns:190px 1fr;gap:40px;padding:36px 0;border-bottom:1px solid ${C.border}}
.exp-row:last-child{border-bottom:none}
@media(max-width:640px){.exp-row{grid-template-columns:1fr;gap:10px}}
.ep{font-size:10px;font-weight:400;letter-spacing:.5px;color:#FFFFFF}
.etype{font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#E8C97A;margin-top:4px;font-family:'DM Mono',monospace}
.erole{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;margin-bottom:2px;line-height:1.2}
.eorg{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.gold};margin-bottom:6px;font-family:'DM Mono',monospace}
.eco{font-size:11px;color:#C0BDB8;font-weight:300;margin-bottom:12px;font-style:italic;line-height:1.5}
.ebuls{list-style:none;display:flex;flex-direction:column;gap:8px}
.ebuls li{font-size:12px;line-height:1.8;color:#FFFFFF;padding-left:18px;position:relative;font-weight:300}
.ebuls li::before{content:'';position:absolute;left:0;top:10px;width:8px;height:1px;background:${C.goldD}}

/* CONTACT */
.contact-cols{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
@media(max-width:700px){.contact-cols{grid-template-columns:1fr;gap:44px}}
.ch{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,3.5vw,44px);font-weight:300;line-height:1.2;margin-bottom:18px}
.cb{font-size:13px;line-height:1.9;color:#FFFFFF;font-weight:300}
.avail{display:flex;flex-wrap:wrap;gap:7px;margin-top:26px}
.abadge{display:flex;align-items:center;gap:7px;font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.gold};border:1px solid ${C.goldD};padding:6px 12px;background:${C.goldXD};font-family:'DM Mono',monospace}
.adot{width:4px;height:4px;border-radius:50%;background:${C.gold};animation:pulse 2.5s ease-in-out infinite}
.clinks{display:flex;flex-direction:column;border:1px solid ${C.border}}
.clink{display:grid;grid-template-columns:1fr auto;align-items:center;padding:16px 20px;border-bottom:1px solid ${C.border};font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#E8C97A;background:none;cursor:pointer;font-family:'DM Mono',monospace;transition:all .2s;text-align:left;width:100%}
.clink:last-child{border-bottom:none}
.clink:hover{background:${C.bg2};color:${C.text};padding-left:28px}
.clink-h{font-size:9px;font-weight:300;letter-spacing:.5px;text-transform:none;color:${C.goldL};font-family:'DM Sans',sans-serif}

/* FOOTER */
.footer{padding:34px 0;display:flex;justify-content:space-between;align-items:center}
.footer-n{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:600;color:#FFFFFF}
.footer-c{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FFFFFF;font-family:'DM Mono',monospace}


/* TESTIMONIALS */
.testi-wrap{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:${C.border};border:1px solid ${C.border}}
@media(max-width:640px){.testi-wrap{grid-template-columns:1fr}}
.testi-card{background:${C.bg2};padding:36px 32px;display:flex;flex-direction:column;gap:20px;transition:background .2s}
.testi-card:hover{background:${C.bg3}}
.testi-quote{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:300;line-height:1.75;color:#FFFFFF;font-style:italic;flex:1}
.testi-quote::before{content:'"';font-size:48px;color:${C.goldD};line-height:0;vertical-align:-18px;margin-right:4px;font-style:normal}
.testi-quote::after{content:'"';font-size:48px;color:${C.goldD};line-height:0;vertical-align:-18px;margin-left:2px;font-style:normal}
.testi-person{display:flex;align-items:center;gap:14px;border-top:1px solid ${C.border};padding-top:20px}
.testi-avatar{width:44px;height:44px;border-radius:50%;background:${C.goldXD};border:1px solid ${C.goldD};display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:400;color:${C.gold};flex-shrink:0}
.testi-name{font-size:12px;font-weight:600;color:${C.text};margin-bottom:2px}
.testi-title{font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${C.gold};font-family:'DM Mono',monospace}


.avail-indicator{display:inline-flex;align-items:center;gap:8px;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#4ADE80;font-family:'DM Mono',monospace;margin-bottom:20px}
.avail-dot-wrap{position:relative;width:10px;height:10px;flex-shrink:0}
.avail-dot-core{position:absolute;inset:0;border-radius:50%;background:#4ADE80}
.avail-dot-ring{position:absolute;inset:-3px;border-radius:50%;background:#4ADE80;opacity:.3;animation:availPulse 2s ease-in-out infinite}
@keyframes availPulse{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(1.6);opacity:0}}


.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
.hamburger span{display:block;width:22px;height:1.5px;background:#FFFFFF;transition:all .3s}
@media(max-width:700px){.hamburger{display:flex;order:-1}.nav-center{display:none!important}}
.mob-item{display:block;width:100%;background:none;border:none;color:#FFFFFF;font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;padding:14px 32px;text-align:left;transition:color .2s;border-bottom:1px solid ${C.border}}
.mob-item:hover{color:${C.gold}}
.mobile-menu{position:fixed;top:68px;left:0;right:0;background:rgba(8,8,8,.98);backdrop-filter:blur(24px);border-bottom:1px solid ${C.border};z-index:499;animation:slideDown .2s ease;padding:8px 0}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

.btt{position:fixed;bottom:26px;right:26px;width:40px;height:40px;background:${C.bg2};border:1px solid ${C.border};color:${C.gold};font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:400;transition:all .2s}
.btt:hover{border-color:${C.gold}}

.lt::after{content:'...';animation:ld 1.2s steps(4,end) infinite}
@keyframes ld{0%,20%{content:'.'}40%{content:'..'}60%,100%{content:'...'}}
.recharts-default-tooltip{background:${C.bg3}!important;border:1px solid ${C.border}!important;font-family:'DM Sans',sans-serif!important;font-size:10px!important;border-radius:0!important}

/* CV MODAL */
.cv-overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:900;display:flex;align-items:flex-start;justify-content:center;padding:40px 20px;overflow-y:auto;backdrop-filter:blur(8px)}
.cv-modal{background:#fff;color:#111;width:100%;max-width:760px;padding:56px 56px;position:relative;font-family:'DM Sans',sans-serif}
@media(max-width:600px){.cv-modal{padding:32px 24px}}
.cv-close{position:absolute;top:20px;right:20px;background:none;border:1px solid #ddd;color:#666;font-size:18px;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:sans-serif;line-height:1}
.cv-close:hover{border-color:#333;color:#111}
.cv-print-btn{position:absolute;top:20px;right:64px;background:#111;border:none;color:#fff;font-family:'DM Mono',monospace;font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:9px 16px;cursor:pointer;transition:background .2s}
.cv-print-btn:hover{background:#333}
.cv-name{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:600;color:#111;line-height:1;margin-bottom:4px}
.cv-role{font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#666;margin-bottom:16px;font-family:'DM Mono',monospace}
.cv-contact-line{display:flex;flex-wrap:wrap;gap:16px;font-size:10px;color:#666;font-family:'DM Mono',monospace;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid #111}
.cv-section{margin-bottom:24px}
.cv-section-title{font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#111;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #ddd;font-family:'DM Mono',monospace}
.cv-profile{font-size:12px;line-height:1.8;color:#333;font-weight:300}
.cv-exp-item{margin-bottom:18px}
.cv-exp-item:last-child{margin-bottom:0}
.cv-exp-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px;flex-wrap:wrap;gap:8px}
.cv-exp-role{font-size:14px;font-weight:600;color:#111;font-family:'Cormorant Garamond',serif}
.cv-exp-period{font-size:9px;font-weight:600;letter-spacing:1.5px;color:#888;font-family:'DM Mono',monospace}
.cv-exp-org{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#C9A84C;margin-bottom:3px;font-family:'DM Mono',monospace}
.cv-exp-co-desc{font-size:11px;color:#888;font-style:italic;margin-bottom:8px;font-weight:300}
.cv-buls{list-style:none;padding:0;display:flex;flex-direction:column;gap:5px}
.cv-buls li{font-size:11px;line-height:1.7;color:#444;padding-left:16px;position:relative;font-weight:300}
.cv-buls li::before{content:'–';position:absolute;left:0;color:#C9A84C;font-weight:400}
.cv-edu-item{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;flex-wrap:wrap;gap:8px}
.cv-edu-qual{font-size:13px;font-weight:500;color:#111;font-family:'Cormorant Garamond',serif}
.cv-edu-inst{font-size:10px;color:#888;font-weight:300}
.cv-edu-period{font-size:9px;color:#aaa;font-family:'DM Mono',monospace}
.cv-skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:500px){.cv-skills-grid{grid-template-columns:1fr}}
.cv-skill-group-title{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#111;margin-bottom:5px;font-family:'DM Mono',monospace}
.cv-skill-tags{display:flex;flex-wrap:wrap;gap:4px}
.cv-skill-tag{font-size:9px;background:#f4f4f4;color:#444;padding:3px 8px;font-weight:400}
.cv-cert-list{display:flex;flex-direction:column;gap:5px}
.cv-cert{font-size:11px;color:#444;padding-left:16px;position:relative;font-weight:300;line-height:1.6}
.cv-cert::before{content:'–';position:absolute;left:0;color:#C9A84C}

@media print {
  .nav,.btt,.cv-close,.cv-print-btn{display:none!important}
  .cv-overlay{position:static!important;background:none!important;padding:0!important;backdrop-filter:none!important}
  .cv-modal{box-shadow:none!important;max-width:100%!important;padding:32px!important}
  body > *:not(.cv-overlay){display:none!important}
}
`;

async function ai(messages, system) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages }),
  });
  const d = await r.json();
  return d.content?.[0]?.text || "Something went wrong. Please try again.";
}

const fmtM = n => `$${(n / 1e6).toFixed(1)}M`;

// ── CV MODAL ─────────────────────────────────────────────────────────
function CVModal({ onClose }) {
  return (
    <div className="cv-overlay" onClick={e => e.target.className === "cv-overlay" && onClose()}>
      <div className="cv-modal">
        <button className="cv-print-btn" onClick={() => window.print()}>Save as PDF</button>
        <button className="cv-close" onClick={onClose}>×</button>

        <div className="cv-name">Nwaduhu Ozoemenam Endurance</div>
        <div className="cv-role">FinTech Product Analyst</div>
        <div className="cv-contact-line">
          <span>Dublin, Ireland</span>
          <span>Open to Remote · Worldwide</span>
          <span>nwaduhuendurance@gmail.com</span>
          <span>linkedin.com/in/ozoemenam-nwaduhu-2a541123a</span>
          <span>github.com/OzzyTe</span>
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Professional Profile</div>
          <div className="cv-profile">Results-driven FinTech Product Analyst with 5+ years of experience in product management, financial analysis, and revenue forecasting. Delivered 45% revenue uplift at Zion Global Limited and unlocked $10M+ in new revenue at Bostaneastern, conducting financial analysis across a $50M+ product portfolio. Currently completing a BA Honours in Accounting and Finance at Independent College Dublin, alongside a BSc in Artificial Intelligence at Johannes Kepler University, Linz. 9 of 13 ACCA exemptions confirmed. Pursuing the Advanced Financial Modeler (AFM) certification. Open to roles globally — fund administration, transfer agency, financial analysis, and product management across the IFSC, remote-first organisations, and fintech companies worldwide.</div>
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Professional Experience</div>
          {[
            { role:"Product Manager & Financial Data Analyst", org:"Zion Global Limited", period:"May 2023 – May 2026", co:"Technology and consulting firm delivering AI-driven products and digital transformation solutions across African and global markets. Full-time · Remote.", bullets:["Delivered 45% revenue uplift within 6 months by executing an AI/ML-informed product roadmap prioritised through rigorous statistical asset tracking and fund metric analysis","Architected advanced data pipelines and SQL-backed automation systems that eliminated corporate operational friction and mitigated transactional reconciliation breaks for enterprise financial clients","Led cross-functional squads (engineering, data science, design) to optimise core portfolio delivery workflows, improving development efficiency by 33% using structured analytical frameworks","Applied NLP-powered behavioural metrics and data-driven iteration methodologies to product systems, boosting portfolio metrics and lifting quantitative NPS scores by 43%","Mentored a high-performing team of 8+ product managers on outcome-driven product analysis and algorithmic financial modelling"] },
            { role:"FinTech Product Analyst & Operations Associate", org:"Su.N Gastronomie Betriebs GmbH", period:"Jun 2025 – Nov 2025", co:"Vienna, Austria · Part-time · On-site. Operational and financial services environment requiring hands-on data analysis and digital payment systems management.", bullets:["Analysed high-volume transactional data, point-of-sale (POS) metrics, and financial workflows to identify operational inefficiencies and product-level improvements","Evaluated digital payment system performance using fintech product analysis frameworks to identify and mitigate transactional reconciliation breaks","Applied accounting controls to inventory tracking and supplier invoicing, producing structured management reporting and KPI monitoring dashboards"] },
            { role:"Executive Product Manager & Quantitative Finance Analyst", org:"Bostaneastern", period:"May 2022 – Apr 2023", co:"Saudi Arabia · Full-time · Remote. Digital transformation and AI solutions firm serving clients across the Middle East and global markets.", bullets:["Negotiated strategic AI vendor partnerships and structured algorithmic execution frameworks that unlocked $10M in new revenue lines","Conducted advanced financial analysis, DCF/LBO portfolio valuations, and risk-adjusted revenue forecasting across a multi-million euro ($50M+) product portfolio","Built and deployed Python-based sentiment analysis models for an automated Voice-of-the-Customer programme, raising core product NPS from +32 to +65","Drove regional digital transformation by integrating automated, SQL-backed quantitative models into corporate decision pipelines, improving execution speed by 40%"] },
            { role:"Product Manager & Data Analytics Strategy Lead", org:"SynCore EDU LLC", period:"Oct 2021 – Mar 2022", co:"United States · Full-time · Remote. US-based education technology company focused on professional development and product management training.", bullets:["Built and coached a team of 8+ product managers, embedding advanced data analysis and fintech product optimisation tools into daily workflows","Executed a data-informed product roadmap resulting in 25% annual revenue growth and launched AI-enhanced features contributing $8M+ in incremental revenue","Designed scalable customer data automation pipelines to optimise user retention and engagement metrics, boosting platform activity by 35%"] },
          ].map((e,i) => (
            <div className="cv-exp-item" key={i}>
              <div className="cv-exp-header"><span className="cv-exp-role">{e.role}</span><span className="cv-exp-period">{e.period}</span></div>
              <div className="cv-exp-org">{e.org}</div>
              <div className="cv-exp-co-desc">{e.co}</div>
              <ul className="cv-buls">{e.bullets.map((b,j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Education</div>
          {[
            ["BA (Hons) Accounting & Finance","Independent College Dublin, Ireland","2026 – 2027"],
            ["BSc Artificial Intelligence","Johannes Kepler University, Linz, Austria","2024 – 2026"],
            ["Higher National Diploma in Accounting","Federal Polytechnic Oko, Anambra State, Nigeria","Jan 2016 – Jun 2021"],
          ].map(([q,i,p]) => (
            <div className="cv-edu-item" key={q}>
              <div><div className="cv-edu-qual">{q}</div><div className="cv-edu-inst">{i}</div></div>
              <div className="cv-edu-period">{p}</div>
            </div>
          ))}
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Certifications & In Progress</div>
          <div className="cv-cert-list">
            {["ACCA Professional Qualification — 9 of 13 exemptions confirmed","Advanced Financial Modeler (AFM) — Financial Modeling Institute · October 2026 sitting","SAP FICO — C_TS4FI certification (SAP Learning Hub)"].map(c => <div className="cv-cert" key={c}>{c}</div>)}
          </div>
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Skills</div>
          <div className="cv-skills-grid">
            {[
              ["Finance & Accounting",["Financial Modelling","DCF / LBO","IFRS Reporting","Fund Administration","NAV Calculation","Management Accounting","ACCA"]],
              ["Technology",["Python","React / JavaScript","SQL","SAP FICO","LLM Integration","REST APIs","Git"]],
              ["Product & Management",["Product Strategy","Roadmapping","Agile Delivery","Stakeholder Management","Go-to-Market","Cross-functional Leadership"]],
              ["Tools",["Microsoft Excel (Advanced)","PowerPoint","Figma","Bloomberg (Familiarity)","Vercel","GitHub"]],
            ].map(([title, tags]) => (
              <div key={title}>
                <div className="cv-skill-group-title">{title}</div>
                <div className="cv-skill-tags">{tags.map(t => <span className="cv-skill-tag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-section">
          <div className="cv-section-title">References</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            {[
              ["A. Khan Ghazanfar","CEO, Bostaneastern","ceo@bostaneastern.com"],
              ["Prof. Thomas Forstner","Professor of Statistics in AI, JKU Linz","thomas.forstner@jku.at"],
            ].map(([name,title,contact]) => (
              <div key={name} style={{padding:"10px 14px",background:"#f8f8f8",borderLeft:"2px solid #C9A84C"}}>
                <div style={{fontSize:12,fontWeight:600,color:"#111",marginBottom:2}}>{name}</div>
                <div style={{fontSize:10,color:"#888",marginBottom:2}}>{title}</div>
                <div style={{fontSize:10,color:"#C9A84C",fontFamily:"'DM Mono',monospace"}}>{contact}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-section" style={{marginBottom:0}}>
          <div className="cv-section-title">Additional</div>
          <div className="cv-profile">Legally lived in the EU for 2 years and travelled extensively across the EU and the United Kingdom.</div>
        </div>
      </div>
    </div>
  );
}


// ── COMPARABLE COMPANY ANALYSIS ──────────────────────────────────────
function CompsModel() {
  const peers=[
    {name:"Wise",ev:8.2,rev:1.1,ebitda:0.35},{name:"Nu Holdings",ev:54.1,rev:2.7,ebitda:0.60},
    {name:"SoFi Technologies",ev:9.8,rev:2.1,ebitda:0.31},{name:"PayPal",ev:62.4,rev:31.8,ebitda:5.20},
    {name:"Block (Square)",ev:38.7,rev:21.9,ebitda:1.80},{name:"Revolut (est.)",ev:45.0,rev:2.2,ebitda:0.48},
  ];
  const [tgt,setTgt]=useState({rev:5.0,ebitda:1.0});
  const setT=(k,v)=>setTgt(p=>({...p,[k]:parseFloat(v)||0}));
  const wm=peers.map(p=>({...p,evRev:+(p.ev/p.rev).toFixed(1),evEbitda:p.ebitda>0?+(p.ev/p.ebitda).toFixed(1):null}));
  const evRevs=wm.map(p=>p.evRev),evEbitdas=wm.map(p=>p.evEbitda).filter(Boolean);
  const med=arr=>{const s=[...arr].sort((a,b)=>a-b);return arr.length%2===0?(s[arr.length/2-1]+s[arr.length/2])/2:s[Math.floor(arr.length/2)];};
  const mER=med(evRevs),mEE=med(evEbitdas);
  const implLow=+(tgt.rev*Math.min(...evRevs)).toFixed(1);
  const implMed=+((tgt.rev*mER+tgt.ebitda*mEE)/2).toFixed(1);
  const implHigh=+(tgt.rev*Math.max(...evRevs)).toFixed(1);
  const fball=[
    {name:"EV/Rev Low",val:+(tgt.rev*Math.min(...evRevs)).toFixed(1)},
    {name:"EV/Rev Median",val:+(tgt.rev*mER).toFixed(1)},
    {name:"EV/Rev High",val:+(tgt.rev*Math.max(...evRevs)).toFixed(1)},
    {name:"EV/EBITDA Low",val:+(tgt.ebitda*Math.min(...evEbitdas)).toFixed(1)},
    {name:"EV/EBITDA Med",val:+(tgt.ebitda*mEE).toFixed(1)},
    {name:"EV/EBITDA High",val:+(tgt.ebitda*Math.max(...evEbitdas)).toFixed(1)},
  ];
  return (
    <div>
      <div style={{marginBottom:20}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,marginBottom:5}}>Comparable Company Analysis</div>
        <div style={{fontSize:11,color:C.textM,lineHeight:1.7,fontWeight:300}}>Enter your target company Revenue and EBITDA to see implied enterprise value ranges from fintech peer multiples.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        <div><label className="dlbl">Target Revenue ($B)</label><input className="din" type="number" value={tgt.rev} onChange={e=>setT("rev",e.target.value)} step={0.1} min={0}/></div>
        <div><label className="dlbl">Target EBITDA ($B)</label><input className="din" type="number" value={tgt.ebitda} onChange={e=>setT("ebitda",e.target.value)} step={0.1} min={0}/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
        {[["Implied Low","$"+implLow+"B","25th pct"],["Implied Median","$"+implMed+"B","Median multiples"],["Implied High","$"+implHigh+"B","75th pct"]].map(([l,v,s],i)=>(
          <div className={"dmetric"+(i===1?" hi":"")} key={l}><div className="dm-l">{l}</div><div className="dm-v" style={{fontSize:20}}>{v}</div><div className="dm-s">{s}</div></div>
        ))}
      </div>
      <div className="cbox" style={{marginBottom:14}}>
        <div className="clbl">Football Field — Implied EV by Method ($B)</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={fball} layout="vertical">
            <CartesianGrid strokeDasharray="2 4" stroke={C.border} horizontal={false}/>
            <XAxis type="number" tick={{fill:C.textM,fontSize:8}} axisLine={false} tickLine={false} tickFormatter={v=>"$"+v+"B"}/>
            <YAxis type="category" dataKey="name" tick={{fill:C.textM,fontSize:9}} axisLine={false} tickLine={false} width={95}/>
            <Tooltip contentStyle={{background:C.bg3,border:`1px solid ${C.border}`,fontSize:10}} formatter={v=>"$"+v+"B"}/>
            <Bar dataKey="val" fill={C.gold} radius={[0,2,2,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="twrap">
        <table className="tbl">
          <thead><tr><th style={{textAlign:"left"}}>Company</th><th>EV ($B)</th><th>Revenue ($B)</th><th>EBITDA ($B)</th><th>EV/Rev</th><th>EV/EBITDA</th></tr></thead>
          <tbody>
            {wm.map(p=><tr key={p.name}><td>{p.name}</td><td>{p.ev}</td><td>{p.rev}</td><td>{p.ebitda}</td><td>{p.evRev}x</td><td>{p.evEbitda?p.evEbitda+"x":"N/M"}</td></tr>)}
            <tr><td>Median</td><td>—</td><td>—</td><td>—</td><td style={{color:C.gold}}>{mER}x</td><td style={{color:C.gold}}>{mEE}x</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── NAV CALCULATOR & RECONCILIATION SIMULATOR ────────────────────────
function NAVCalculator() {
  const [inp,setInp]=useState({
    equities:480000000, cash:35000000, otherAssets:8000000,
    mgmtFee:1200000, accruedExp:650000, otherLiab:400000,
    shares:42500000,
  });
  const set=(k,v)=>setInp(p=>({...p,[k]:parseFloat(v)||0}));
  const totalAssets = inp.equities + inp.cash + inp.otherAssets;
  const totalLiab = inp.mgmtFee + inp.accruedExp + inp.otherLiab;
  const netAssets = totalAssets - totalLiab;
  const navPerShare = inp.shares > 0 ? netAssets / inp.shares : 0;
  const [recon,setRecon]=useState({fundAccounting: netAssets, custodian: netAssets - 187500});
  const variance = recon.fundAccounting - recon.custodian;
  const variancePct = recon.custodian !== 0 ? (variance/recon.custodian*100) : 0;
  const [resolved,setResolved]=useState(false);
  const resolve = () => {
    setRecon(p=>({...p, custodian: p.fundAccounting}));
    setResolved(true);
    setTimeout(()=>setResolved(false), 2500);
  };
  useEffect(()=>{
    if(!resolved) setRecon(p=>({fundAccounting:netAssets, custodian: p.custodian === p.fundAccounting ? netAssets : netAssets - Math.abs(p.fundAccounting-p.custodian || 187500)}));
  },[netAssets]);
  const fmt = n => '$'+n.toLocaleString('en-US',{maximumFractionDigits:0});
  return (
    <div>
      <div style={{marginBottom:20}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,marginBottom:5}}>NAV Calculator &amp; Reconciliation Simulator</div>
        <div style={{fontSize:11,color:C.textM,lineHeight:1.7,fontWeight:300}}>Simulates the daily fund accounting workflow — calculating Net Asset Value per Share, then reconciling Fund Accounting records against Custodian records to detect and resolve trade breaks.</div>
      </div>
      <div className="cbox" style={{marginBottom:14}}>
        <div className="clbl">Fund Assets &amp; Liabilities (USD)</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
          <div><label className="dlbl">Equities</label><input className="din" type="number" value={inp.equities} onChange={e=>set("equities",e.target.value)}/></div>
          <div><label className="dlbl">Cash</label><input className="din" type="number" value={inp.cash} onChange={e=>set("cash",e.target.value)}/></div>
          <div><label className="dlbl">Other Assets</label><input className="din" type="number" value={inp.otherAssets} onChange={e=>set("otherAssets",e.target.value)}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
          <div><label className="dlbl">Mgmt Fee Accrual</label><input className="din" type="number" value={inp.mgmtFee} onChange={e=>set("mgmtFee",e.target.value)}/></div>
          <div><label className="dlbl">Accrued Expenses</label><input className="din" type="number" value={inp.accruedExp} onChange={e=>set("accruedExp",e.target.value)}/></div>
          <div><label className="dlbl">Other Liabilities</label><input className="din" type="number" value={inp.otherLiab} onChange={e=>set("otherLiab",e.target.value)}/></div>
        </div>
        <div style={{maxWidth:220}}>
          <label className="dlbl">Outstanding Shares</label><input className="din" type="number" value={inp.shares} onChange={e=>set("shares",e.target.value)}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
        <div className="dmetric"><div className="dm-l">Total Net Assets</div><div className="dm-v">{fmt(netAssets)}</div><div className="dm-s">Assets − Liabilities</div></div>
        <div className="dmetric hi"><div className="dm-l">NAV Per Share</div><div className="dm-v">${navPerShare.toFixed(4)}</div><div className="dm-s">Net Assets ÷ Outstanding Shares</div></div>
        <div className="dmetric"><div className="dm-l">Total Liabilities</div><div className="dm-v">{fmt(totalLiab)}</div><div className="dm-s">Fees + Accruals</div></div>
      </div>
      <div className="cbox" style={{marginBottom:0}}>
        <div className="clbl">Trade Reconciliation — Fund Accounting vs Custodian</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <div className="dmetric"><div className="dm-l">Fund Accounting Records</div><div className="dm-v" style={{fontSize:18}}>{fmt(recon.fundAccounting)}</div></div>
          <div className="dmetric" style={{borderLeft: Math.abs(variance)>1 ? "2px solid #E05252" : "2px solid #4ADE80"}}><div className="dm-l">Custodian Records</div><div className="dm-v" style={{fontSize:18,color: Math.abs(variance)>1 ? "#E05252" : "#4ADE80"}}>{fmt(recon.custodian)}</div></div>
        </div>
        {Math.abs(variance) > 1 ? (
          <div style={{background:"#1A0A0A",border:"1px solid #E05252",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#E05252",fontFamily:"'DM Mono',monospace",marginBottom:4}}>⚠ Variance Detected</div>
              <div style={{fontSize:11,color:C.textS}}>Discrepancy of {fmt(Math.abs(variance))} ({variancePct.toFixed(3)}%) between Fund Accounting and Custodian records.</div>
            </div>
            <button onClick={resolve} style={{background:"#E05252",border:"none",color:"#000",fontFamily:"'DM Mono',monospace",fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",padding:"10px 18px",cursor:"pointer",whiteSpace:"nowrap"}}>Resolve Discrepancy →</button>
          </div>
        ) : (
          <div style={{background:"#0A1A0A",border:"1px solid #2A4A2A",padding:"12px 16px",textAlign:"center"}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#4ADE80",fontFamily:"'DM Mono',monospace"}}>{resolved ? "✓ Discrepancy Resolved — Records Matched" : "✓ Records Reconciled — No Variance"}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── DCF MODEL ─────────────────────────────────────────────────────────
function DCFModel() {
  const [inp,setInp]=useState({rev:50,growth:15,ebitda:25,tax:21,capex:6,da:4,nwc:2,wacc:10,tgr:2.5,yrs:5});
  const set=(k,v)=>setInp(p=>({...p,[k]:parseFloat(v)||0}));
  const calc=()=>{
    const rows=[];let rev=inp.rev;
    for(let y=1;y<=inp.yrs;y++){
      rev=y===1?rev*(1+inp.growth/100):rows[y-2].rev*(1+inp.growth/100);
      const ebitda=rev*inp.ebitda/100,da=rev*inp.da/100;
      const fcf=(ebitda-da)*(1-inp.tax/100)+da-rev*inp.capex/100-rev*inp.nwc/100;
      rows.push({y,rev,ebitda,fcf,pv:fcf/Math.pow(1+inp.wacc/100,y)});
    }
    const tv=(rows[rows.length-1].fcf*(1+inp.tgr/100))/(inp.wacc/100-inp.tgr/100);
    const pvTV=tv/Math.pow(1+inp.wacc/100,inp.yrs),sumPV=rows.reduce((a,r)=>a+r.pv,0);
    return{rows,tv,pvTV,sumPV,ev:sumPV+pvTV};
  };
  const{rows,tv,pvTV,sumPV,ev}=calc();
  return (
    <div>
      <div style={{marginBottom:20}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,marginBottom:5}}>DCF Valuation Model</div><div style={{fontSize:11,color:C.textM,lineHeight:1.7,fontWeight:300}}>Adjust any input to recalculate enterprise value in real time.</div></div>
      <div className="dcf-wrap">
        <div className="panel"><div className="plbl">Inputs</div>
          {[["Base Revenue ($M)","rev"],["Revenue Growth (%)","growth"],["EBITDA Margin (%)","ebitda"],["Tax Rate (%)","tax"],["CapEx (% Rev)","capex"],["D&A (% Rev)","da"],["NWC Change (%)","nwc"],["WACC (%)","wacc"],["Terminal Growth (%)","tgr"],["Forecast Years","yrs"]].map(([l,k])=>(
            <div className="drow" key={k}><label className="dlbl">{l}</label><input className="din" type="number" value={inp[k]} onChange={e=>set(k,e.target.value)} step={k==="yrs"?1:0.5} min={0}/></div>
          ))}
        </div>
        <div className="dresults">
          <div className="dmetrics">
            {[["Enterprise Value",fmtM(ev),"PV FCFs + PV Terminal Value",true],["PV of FCFs",fmtM(sumPV),"Discounted forecast cash flows",false],["Terminal Value",fmtM(tv),"Gordon Growth Model",false],["PV Terminal Value",fmtM(pvTV),`At ${inp.wacc}% WACC`,false]].map(([l,v,s,h])=>(
              <div className={`dmetric${h?" hi":""}`} key={l}><div className="dm-l">{l}</div><div className="dm-v">{v}</div><div className="dm-s">{s}</div></div>
            ))}
          </div>
          <div className="cbox"><div className="clbl">Revenue & FCF Projection ($M)</div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={rows.map(r=>({y:`Y${r.y}`,Revenue:+r.rev.toFixed(1),FCF:+r.fcf.toFixed(1)}))}>
                <CartesianGrid strokeDasharray="2 4" stroke={C.border}/><XAxis dataKey="y" tick={{fill:C.textM,fontSize:9}} axisLine={false} tickLine={false}/><YAxis tick={{fill:C.textM,fontSize:9}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:C.bg3,border:`1px solid ${C.border}`,fontSize:10}}/><Legend wrapperStyle={{fontSize:9,color:C.textM}}/>
                <Bar dataKey="Revenue" fill={C.goldD} radius={[2,2,0,0]}/><Bar dataKey="FCF" fill={C.gold} radius={[2,2,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="twrap"><table className="tbl">
            <thead><tr><th style={{textAlign:"left"}}>Period</th><th>Revenue</th><th>EBITDA</th><th>Free Cash Flow</th><th>PV of FCF</th></tr></thead>
            <tbody>
              {rows.map(r=><tr key={r.y}><td>Year {r.y}</td><td>{fmtM(r.rev)}</td><td>{fmtM(r.ebitda)}</td><td>{fmtM(r.fcf)}</td><td>{fmtM(r.pv)}</td></tr>)}
              <tr><td colSpan={4} style={{textAlign:"right"}}>Enterprise Value</td><td>{fmtM(ev)}</td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
}

// ── KPI ───────────────────────────────────────────────────────────────
function KPIDashboard() {
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const rData=months.map((m,i)=>({m,Revenue:+(3.2+i*.38+Math.sin(i)*.4).toFixed(2),Target:+(3.5+i*.35).toFixed(2)}));
  const mgData=months.map((m,i)=>({m,"Gross Margin":+(58+Math.sin(i*.8)*4+i*.3).toFixed(1),"EBITDA Margin":+(22+Math.sin(i*.6)*2.5+i*.2).toFixed(1)}));
  return (
    <div>
      <div style={{marginBottom:20}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,marginBottom:5}}>Financial Performance Dashboard</div><div style={{fontSize:11,color:C.textM,lineHeight:1.7,fontWeight:300}}>Revenue tracking, margin analysis, and KPI monitoring across a 12-month period.</div></div>
      <div className="kpi-top">{[["$52.4M","Annual Revenue","+23.7% YoY"],["61.2%","Gross Margin","+3.1pp YoY"],["24.8%","EBITDA Margin","+1.8pp YoY"],["2.3%","Churn Rate","-0.4pp YoY"]].map(([v,l,c])=>(
        <div className="kcard" key={l}><div className="kval">{v}</div><div className="klbl">{l}</div><div className="kchg">{c}</div></div>
      ))}</div>
      <div className="kcharts">
        <div className="cbox"><div className="clbl">Revenue vs Target ($M)</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={rData}><defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.gold} stopOpacity={.12}/><stop offset="95%" stopColor={C.gold} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="2 4" stroke={C.border}/><XAxis dataKey="m" tick={{fill:C.textM,fontSize:8}} axisLine={false} tickLine={false}/><YAxis tick={{fill:C.textM,fontSize:8}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:C.bg3,border:`1px solid ${C.border}`,fontSize:10}}/>
              <Area type="monotone" dataKey="Revenue" stroke={C.gold} strokeWidth={1.5} fill="url(#rg)" dot={false}/><Line type="monotone" dataKey="Target" stroke={C.textM} strokeWidth={1} strokeDasharray="4 4" dot={false}/><Legend wrapperStyle={{fontSize:8,color:C.textM}}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="cbox"><div className="clbl">Margin Trends (%)</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={mgData}><CartesianGrid strokeDasharray="2 4" stroke={C.border}/><XAxis dataKey="m" tick={{fill:C.textM,fontSize:8}} axisLine={false} tickLine={false}/><YAxis tick={{fill:C.textM,fontSize:8}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:C.bg3,border:`1px solid ${C.border}`,fontSize:10}}/>
              <Line type="monotone" dataKey="Gross Margin" stroke={C.gold} strokeWidth={1.5} dot={false}/><Line type="monotone" dataKey="EBITDA Margin" stroke={C.goldD} strokeWidth={1.5} dot={false} strokeDasharray="4 2"/><Legend wrapperStyle={{fontSize:8,color:C.textM}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ── ROADMAP ───────────────────────────────────────────────────────────
function RoadmapPlanner() {
  const seed=[{id:1,title:"Onboarding Flow Redesign",q:"Q1",p:"High"},{id:2,title:"PM Coaching Curriculum v2",q:"Q1",p:"Medium"},{id:3,title:"AI Feature Discovery Sprint",q:"Q2",p:"High"},{id:4,title:"Analytics Dashboard",q:"Q2",p:"Medium"},{id:5,title:"Stakeholder Reporting Suite",q:"Q3",p:"Low"},{id:6,title:"Product Strategy Workshop",q:"Q4",p:"Medium"}];
  const [items,setItems]=useState(seed);const [form,setForm]=useState({title:"",q:"Q1",p:"High"});
  const upd=(k,v)=>setForm(p=>({...p,[k]:v}));
  const add=()=>{if(!form.title.trim())return;setItems(p=>[...p,{id:Date.now(),title:form.title,q:form.q,p:form.p}]);setForm({title:"",q:"Q1",p:"High"});};
  const del=id=>setItems(p=>p.filter(x=>x.id!==id));
  return (
    <div>
      <div style={{marginBottom:20}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,marginBottom:5}}>Product Roadmap Planner</div><div style={{fontSize:11,color:C.textM,lineHeight:1.7,fontWeight:300}}>Add initiatives, assign quarters, and set priorities. Built around the product strategy work at SynCore EDU LLC.</div></div>
      <div className="rm-add">
        <div><label className="fl">Initiative</label><input className="fi" value={form.title} onChange={e=>upd("title",e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="e.g. Launch PM Certification Track"/></div>
        <div><label className="fl">Quarter</label><select className="rmsel" value={form.q} onChange={e=>upd("q",e.target.value)}>{["Q1","Q2","Q3","Q4"].map(q=><option key={q}>{q}</option>)}</select></div>
        <div><label className="fl">Priority</label><select className="rmsel" value={form.p} onChange={e=>upd("p",e.target.value)}>{["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}</select></div>
        <div style={{display:"flex",alignItems:"flex-end"}}><button className="btn btn-gold btn-sm" onClick={add} style={{width:"100%",justifyContent:"center"}}>Add</button></div>
      </div>
      <div className="rm-board">{["Q1","Q2","Q3","Q4"].map(q=>(
        <div className="rm-col" key={q}><div className="rm-ch">{q}</div><div className="rm-cb">
          {items.filter(x=>x.q===q).length===0&&<div className="rm-empty">Empty</div>}
          {items.filter(x=>x.q===q).map(item=>(
            <div className="rm-item" key={item.id}><div className="rm-t">{item.title}</div><div className="rm-meta"><span className={`rm-p ${item.p}`}>{item.p}</span><button className="rm-del" onClick={()=>del(item.id)}>×</button></div></div>
          ))}
        </div></div>
      ))}</div>
    </div>
  );
}

// ── CHAT ─────────────────────────────────────────────────────────────
function ChatTool() {
  const SYS=`You are the professional assistant for Nwaduhu Ozoemenam Endurance (known as Ozoemenam). Legally lived in the EU for 2 years. FinTech Product Analyst and finance professional, based in Dublin, Ireland. Open to remote opportunities globally. Has travelled extensively across the EU and the UK.
Experience: Senior Senior PM at Zion Global Limited May 2023–Jul 2025 (45% revenue uplift, NPS +43%). Executive PM at Bostaneastern Mar 2021–Apr 2023 ($10M new revenue, $50M+ portfolio, NPS +32 to +65). Senior PM at SynCore EDU LLC Feb 2021–Mar 2022 ($8M revenue, mentored 8+ PMs). Executive Account Support at Raaxo Synergy Jun 2020–Jan 2021. Hospitality Ops at Su.N Gastronomie Vienna Jun–Nov 2025.
Education: BA Honours Accounting & Finance (ICD Dublin, Year 3 advanced entry). BSc AI (JKU Linz, Feb 2024–Present). Diploma PM (Afrihub ICT Institute). Higher National Diploma Accounting (Federal Polytechnic Oko). ACCA: 9/13 exemptions. AFM Oct 2026. SAP FICO C_TS4FI in progress. Google PM Certification.
Content creator: runs Global Relocation Guide on X covering European affairs, African diaspora, and international mobility. Be warm, professional, concise. First person where appropriate.`;
  const [msgs,setMsgs]=useState([{role:"ai",txt:"Hello — I'm here to answer any questions about Ozoemenam's experience, background, or availability."}]);
  const [inp,setInp]=useState("");const [loading,setLoading]=useState(false);const ref=useRef(null);
  useEffect(()=>ref.current?.scrollIntoView({behavior:"smooth"}),[msgs]);
  const send=async()=>{
    if(!inp.trim()||loading)return;const t=inp.trim();setInp("");setLoading(true);
    setMsgs(p=>[...p,{role:"user",txt:t}]);
    const history=msgs.slice(1).map(m=>({role:m.role==="ai"?"assistant":"user",content:m.txt}));
    history.push({role:"user",content:t});
    const reply=await ai(history,SYS);
    setMsgs(p=>[...p,{role:"ai",txt:reply}]);setLoading(false);
  };
  return (
    <div>
      <div className="msgs">
        {msgs.map((m,i)=><div className="msg" key={i}><span className={`msg-r ${m.role}`}>{m.role==="ai"?"Assistant":"You"}</span><span className="msg-c">{m.txt}</span></div>)}
        {loading&&<div className="msg"><span className="msg-r ai">Assistant</span><span className="msg-c" style={{color:C.textM}}>Thinking<span className="lt"/></span></div>}
        <div ref={ref}/>
      </div>
      <div className="chat-row"><input className="chat-in" value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about experience, availability, or skills..."/><button className="chat-go" onClick={send} disabled={loading||!inp.trim()}>Send →</button></div>
    </div>
  );
}

function CVTool(){const [cv,setCv]=useState("");const [jd,setJd]=useState("");const [out,setOut]=useState("");const [loading,setLoading]=useState(false);const [cp,setCp]=useState(false);
  const run=async()=>{setLoading(true);setOut("");const r=await ai([{role:"user",content:`CV:\n${cv}\n\nJob Description:\n${jd}`}],"Senior CV writer for finance and technology roles. Rewrite the CV to match the JD precisely with results-driven language and quantified achievements. ATS-optimised. Sections: Professional Profile, Core Experience, Education & Qualifications, Key Skills. Return only the CV.");setOut(r);setLoading(false);};
  return (<div><div className="fr" style={{marginBottom:16}}><div><label className="fl">Your Current CV</label><textarea className="fta" style={{minHeight:150}} value={cv} onChange={e=>setCv(e.target.value)} placeholder="Paste your CV here..."/></div><div><label className="fl">Job Description</label><textarea className="fta" style={{minHeight:150}} value={jd} onChange={e=>setJd(e.target.value)} placeholder="Paste the job description here..."/></div></div><button className="btn btn-gold btn-sm" onClick={run} disabled={loading||!cv||!jd}>{loading?"Tailoring...":"Tailor My CV"}</button>{(out||loading)&&<div className="out">{loading?<span style={{color:C.textM}}>Tailoring<span className="lt"/></span>:out}</div>}{out&&<button className="copy-btn" onClick={()=>{navigator.clipboard.writeText(out);setCp(true);setTimeout(()=>setCp(false),2000)}}>{cp?"Copied ✓":"Copy"}</button>}</div>);}

function CoverTool(){const [f,setF]=useState({role:"",company:"",jd:"",highlight:""});const [out,setOut]=useState("");const [loading,setLoading]=useState(false);const [cp,setCp]=useState(false);
  const upd=(k,v)=>setF(p=>({...p,[k]:v}));
  const run=async()=>{setLoading(true);setOut("");const r=await ai([{role:"user",content:`Role: ${f.role}\nCompany: ${f.company}\nJD: ${f.jd}\nKey achievement: ${f.highlight}`}],`Cover letter writer for finance and technology roles globally. Candidate: Nwaduhu Ozoemenam Endurance — Senior PM with Higher National Diploma in Accounting (Federal Polytechnic Oko) and BA Honours Accounting & Finance (ICD Dublin). 45% revenue growth, $10M unlocked at Zion Global. Project Manager SynCore EDU. Open to Dublin IFSC, fintech, remote. 3–4 paragraphs, ~350 words. Human but professional. No clichés. First person. Start "Dear Hiring Manager,".`);setOut(r);setLoading(false);};
  return (<div><div className="fr"><div className="fg"><label className="fl">Role Title</label><input className="fi" value={f.role} onChange={e=>upd("role",e.target.value)} placeholder="e.g. Fund Operations Analyst"/></div><div className="fg"><label className="fl">Company</label><input className="fi" value={f.company} onChange={e=>upd("company",e.target.value)} placeholder="e.g. Northern Trust"/></div></div><div className="fg"><label className="fl">Job Description</label><textarea className="fta" value={f.jd} onChange={e=>upd("jd",e.target.value)} placeholder="Key requirements or full JD..."/></div><div className="fg"><label className="fl">Key Achievement</label><input className="fi" value={f.highlight} onChange={e=>upd("highlight",e.target.value)} placeholder="e.g. Delivered 45% revenue growth across AI product portfolio"/></div><button className="btn btn-gold btn-sm" onClick={run} disabled={loading||!f.role||!f.company}>{loading?"Generating...":"Generate Cover Letter"}</button>{(out||loading)&&<div className="out">{loading?<span style={{color:C.textM}}>Writing<span className="lt"/></span>:out}</div>}{out&&<button className="copy-btn" onClick={()=>{navigator.clipboard.writeText(out);setCp(true);setTimeout(()=>setCp(false),2000)}}>{cp?"Copied ✓":"Copy"}</button>}</div>);}

// ── APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled,setScrolled]=useState(false);
  const [active,setActive]=useState("home");
  const [openDemo,setOpenDemo]=useState(null);
  const [toolTab,setToolTab]=useState(0);
  const [btt,setBtt]=useState(false);
  const [showCV,setShowCV]=useState(false);
  const [drawerOpen,setDrawerOpen]=useState(false);

  useEffect(()=>{
    const fn=()=>{
      setScrolled(window.scrollY>40);setBtt(window.scrollY>600);
      for(const id of["contact","experience","testimonials","tools","projects","about","home"]){
        const el=document.getElementById(id);
        if(el&&window.scrollY>=el.offsetTop-130){setActive(id);break;}
      }
    };
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{document.body.style.overflow=showCV?"hidden":""},[showCV]);

  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  const projects=[
    {id:"nav",tags:["Fund Administration","NAV Calculation","Reconciliation","IFSC-Ready"],title:"NAV Calculator & Reconciliation Simulator",desc:"A live fund operations tool — calculate Net Asset Value per Share from fund assets and liabilities, then simulate the daily trade reconciliation workflow between Fund Accounting and Custodian records. Detects variances and resolves discrepancies, mirroring the core operational workflow at fund administrators like State Street, Northern Trust, and BNY Mellon.",status:"Live",demo:<NAVCalculator/>},
    {id:"comps",tags:["Financial Modelling","Comparable Analysis","Valuation","FinTech"],title:"Comparable Company Analysis (Comps)",desc:"A live Comps model using real fintech peer data — Wise, Revolut, Nu Holdings, PayPal, and Block. Enter any target company Revenue and EBITDA to see implied enterprise value ranges via EV/Revenue and EV/EBITDA multiples, with a football field chart.",status:"Live",demo:<CompsModel/>},
    {id:"dcf",tags:["Financial Modelling","DCF Valuation","IFSC-Ready","Quantitative Finance"],title:"DCF Valuation Model",desc:"A fully functional, interactive DCF model — adjust any input and enterprise value, FCF projections, and the full output table recalculate in real time. Built to demonstrate the applied valuation and financial modelling depth expected in fund analysis, investment operations, and IFSC finance roles.",status:"Live",demo:<DCFModel/>},
    {id:"kpi",tags:["Fund Reporting","Management Reporting","Dashboard","Financial Engineering"],title:"Financial Performance Dashboard",desc:"An interactive management reporting dashboard tracking revenue against monthly targets, with gross margin and EBITDA margin trends across a full fiscal year. Mirrors the performance attribution, investor reporting, and financial controls work central to fund administration and finance operations roles.",status:"Live",demo:<KPIDashboard/>},
    {id:"roadmap",tags:["Product Strategy","Agile Delivery","SynCore","Roadmapping"],title:"Product Roadmap Planner",desc:"A live roadmap planning and prioritisation tool built around the product strategy work at SynCore EDU LLC. Add initiatives, assign to quarters, set priority levels, and track across a visual board.",status:"Live",demo:<RoadmapPlanner/>},
    {id:"tools",tags:["Fintech Tools","React","Smart Automation","LLMs"],title:"Career Tools Suite",desc:"Three live tools built into this portfolio — a personal assistant trained on my professional background, a CV tailorer that rewrites CVs against any job description, and a cover letter generator.",status:"Live",demo:null,note:"Available in the Tools section"},
    {id:"updates",tags:["Content Strategy","Europe & Africa","Publishing","Global Mobility"],title:"Global Relocation Guide",desc:"A content account covering European affairs, African diaspora stories, global mobility, and relocation. Running Global Relocation Guide on X with 13.5K followers — organic growth, zero paid promotion.",status:"Active",demo:null,note:"twitter.com/_AustriaUpdates"},
  ]

  const skills=[
    {n:"01",name:"Product Management",desc:"End-to-end product strategy, roadmap planning, and GTM execution for AI-native products.",tags:["Strategy","LLMs","Roadmaps","GTM"]},
    {n:"02",name:"Financial Modelling",desc:"DCF, LBO, and three-statement modelling with focus on valuation and investment analysis.",tags:["DCF","LBO","Valuation","AFM"],badge:"View Model ↓"},
    {n:"03",name:"Accounting & Finance",desc:"ACCA pathway, IFRS financial reporting, and fund accounting fundamentals.",tags:["ACCA","IFRS","HND","Reporting"]},
    {n:"04",name:"Fund Administration",desc:"NAV calculation, trade reconciliation, and investor reporting in a fund operations context.",tags:["NAV","Reconciliation","IFSC","Ops"]},
    {n:"05",name:"Project Management",desc:"Team leadership, cross-functional delivery, and product strategy execution across remote teams.",tags:["Agile","Roadmapping","Teams","Delivery"]},
    {n:"06",name:"Content Creation",desc:"Running a content account across European affairs, African stories, and global mobility — shaped by extensive travel across the EU and UK.",tags:["Publishing","X / Twitter","Growth","Storytelling"]},
    {n:"07",name:"Data & Programming",desc:"Python for data analysis, automation, and machine learning pipeline work.",tags:["Python","SQL","Pandas","ML"]},
    {n:"08",name:"Frontend Development",desc:"Building React applications with API integrations and production-ready interfaces.",tags:["React","JavaScript","REST","Vercel"],badge:"This Site ↓"},
  ];

  return (
    <>
      <style>{CSS}</style>
      {showCV&&<CVModal onClose={()=>setShowCV(false)}/>}

      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="wrap nav-inner">
          <button className="hamburger" onClick={()=>setDrawerOpen(true)} aria-label="Open menu"><span/><span/><span/></button>
          <div className="brand" onClick={()=>go("home")}>
            <div className="brand-name">Ozoemenam Endurance</div>
            <div className="brand-sub">FinTech Product Analyst</div>
          </div>
          <ul className="nav-center">
            {["about","projects","tools","experience","contact"].map(n=>(
              <li key={n}><button className={`nav-btn${active===n?" active":""}`} onClick={()=>go(n)}>{n}</button></li>
            ))}
          </ul>
          <button className="nav-cv" onClick={()=>setShowCV(true)}>Download CV</button>
        </div>
      </nav>
      <div className={`drawer-overlay${drawerOpen?" open":""}`} onClick={()=>setDrawerOpen(false)}/>
      <div className={`mobile-drawer${drawerOpen?" open":""}`}>
        <button className="drawer-close" onClick={()=>setDrawerOpen(false)}>×</button>
        <ul className="drawer-links">
          {["about","projects","tools","experience","contact"].map(n=>(
            <li key={n}>
              <button className="drawer-btn" onClick={()=>{go(n);setDrawerOpen(false);}}>{n}</button>
            </li>
          ))}
        </ul>
      </div>

      <section id="home" style={{padding:0,border:"none"}}>
        <div className="wrap">
          <div className="hero">
            <div className="hero-bg"/><div className="hero-grid"/>
            <div className="hero-left">
              <div className="avail-indicator"><div className="avail-dot-wrap"><div className="avail-dot-core"/><div className="avail-dot-ring"/></div>Available for Immediate Start</div>
            <div className="hero-pre">Dublin, Ireland · Open to Remote · Worldwide</div>
              <h1 className="hero-h">
                <span className="hero-fullname">Nwaduhu Ozoemenam</span>
                <span className="hero-pref">Endurance</span>
              </h1>
              <p className="hero-role">FinTech Product Analyst</p>
              <p className="hero-bio">FinTech Product Analyst and Financial Data Analyst with 5+ years delivering high-impact financial technology products across B2B and B2C platforms. Completed a BSc in Artificial Intelligence at Johannes Kepler Universität Linz, Austria — bridging the gap between financial modelling (DCF and NAV) and advanced data automation pipelines to eliminate corporate operational friction, mitigate transactional reconciliation breaks, and ensure strict regulatory compliance. $10M+ revenue unlocked · $50M+ portfolio managed · Available globally.</p>
              <div className="hero-ctas">
                <button className="btn btn-gold" onClick={()=>go("projects")}>View Projects</button>
                <button className="btn btn-outline" onClick={()=>setShowCV(true)}>Download CV</button>
                <button className="btn btn-ghost" onClick={()=>go("contact")}>Get In Touch</button>
              </div>
              <div className="stats">
                {[["$10M+","Revenue Unlocked"],["45%","Revenue Uplift"],["5+ Yrs","PM Experience"],["$50M+","Portfolio Managed"]].map(([v,l])=>(
                  <div className="stat" key={l}><div className="stat-v">{v}</div><div className="stat-l">{l}</div></div>
                ))}
              </div>
            </div>
            </div>
        </div>
      </section>

      <section id="about">
        <div className="wrap">
          <div className="eyebrow">About</div>
          <div className="about-cols">
            <div>
              <p className="ap">I am a finance and technology professional based in Dublin, Ireland, with over two years of European residency. I hold a Higher National Diploma in Accounting from Federal Polytechnic Oko, Anambra State, and am completing a BA Honours in Accounting and Finance at Independent College Dublin, alongside a BSc in Artificial Intelligence at Johannes Kepler University, Linz, Austria. I have 9 of 13 ACCA exemptions confirmed, with Bloomberg Market Concepts (BMC), AML/KYC awareness, and PSM I certification in progress — all targeted at tier-one financial institutions and high-growth, remote-first fintech organisations worldwide.</p>
              <p className="ap">I have 5+ years of experience across product management, financial analysis, and data systems roles. At Zion Global Limited I delivered 45% revenue uplift through AI/ML-informed roadmaps and data pipelines. At Bostaneastern in Saudi Arabia I unlocked $10M in new revenue, conducted DCF/LBO portfolio valuations, and managed a $50M+ product portfolio. At SynCore EDU LLC I led product strategy and mentored 8+ product managers. I also hold a Diploma in Product Management from Afrihub ICT Institute. Open to IFSC roles, global fintech, and remote-first organisations worldwide — including the EU, USA, Canada, and Australia.</p>
              <p className="ap">I've travelled extensively across the European Union and the United Kingdom, and that lived experience across different markets and cultures shapes how I think about products, users, and financial systems. I also run Global Relocation Guide on X — a content account covering European affairs, African diaspora stories, and international mobility.</p>
            </div>
            <div>
              <div className="cred-list">
                {[["BA (Hons) Accounting & Finance","Independent College Dublin"],["BSc Artificial Intelligence","Johannes Kepler University, Linz"],["Diploma — Product Management","Afrihub ICT Institute"],["Higher National Diploma in Accounting","Federal Polytechnic Oko, Anambra State"],["ACCA Pathway","9 of 13 Exemptions Confirmed"],["Advanced Financial Modeler","Financial Modeling Institute · Oct 2026"],["SAP FICO — C_TS4FI","SAP Learning Hub"],["Foundations of Project Management","Google Certification"]].map(([n,i])=>(
                  <div className="cred" key={n}><div className="cred-name">{n}</div><div className="cred-inst">{i}</div></div>
                ))}
              </div>
            </div>
          </div>
          <div style={{marginTop:80}}>
            <div className="eyebrow">Disciplines</div>
            <div className="skills-grid">
              {skills.map(s=>(
                <div className="sk" key={s.n}>
                  {s.badge&&<button className="sk-badge" onClick={()=>go("projects")}>{s.badge}</button>}
                  <div className="sk-num">{s.n}</div><div className="sk-name">{s.name}</div><div className="sk-desc">{s.desc}</div>
                  <div className="sk-tags">{s.tags.map(t=><span className="sk-tag" key={t}>{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="wrap">
          <div className="eyebrow">Projects</div>
          <div className="proj-list">
            {projects.map((p,i)=>(
              <div className="proj" key={p.id}>
                <div className="proj-top">
                  <div><div className="ptags">{p.tags.map(t=><span className="ptag" key={t}>{t}</span>)}</div><div className="ptitle">{p.title}</div><div className="pdesc">{p.desc}</div></div>
                  <div className="pright"><div className="pstatus"><span className="pdot"/>{p.status}</div>{p.demo&&<button className="btn btn-ghost" onClick={()=>setOpenDemo(openDemo===p.id?null:p.id)}>{openDemo===p.id?"Close":"Live Demo"}</button>}</div>
                </div>
                <div className="pfoot">{p.note&&<span style={{fontSize:9,color:C.textM,letterSpacing:1}}>{p.note}</span>}<div className="pidx">0{i+1} / 0{projects.length}</div></div>
                {openDemo===p.id&&p.demo&&<div className="demo-wrap"><div className="demo-body">{p.demo}</div></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tools">
        <div className="wrap">
          <div className="eyebrow">Tools</div>
          <p style={{fontSize:13,color:"#FFFFFF",fontWeight:300,lineHeight:1.9,maxWidth:520,marginBottom:32}}>Three live tools built into this portfolio — ask anything, tailor a CV, or generate a cover letter.</p>
          <div className="ttabs">{["Personal Assistant","CV Tailorer","Cover Letter Generator"].map((t,i)=><button key={i} className={`ttab${toolTab===i?" active":""}`} onClick={()=>setToolTab(i)}>{t}</button>)}</div>
          <div className="tpane">{toolTab===0&&<ChatTool/>}{toolTab===1&&<CVTool/>}{toolTab===2&&<CoverTool/>}</div>
        </div>
      </section>


      <section id="testimonials">
        <div className="wrap">
          <div className="eyebrow">Testimonials</div>
          <div className="testi-wrap">
            <div className="testi-card">
              <div className="testi-quote">
                Ozoemenam brought a rare combination of strategic clarity and genuine ownership to SynCore. He didn't just manage a team of product managers — he raised the standard of how they thought and delivered. The frameworks he built, the discipline he instilled, and the quality of output he demanded are things we still reference today. He understood product, he understood people, and he understood how to move things forward when the pressure was on. Any organisation that brings him in is getting someone who will make the work better.
              </div>
              <div className="testi-person">
                <div className="testi-avatar">LB</div>
                <div>
                  <div className="testi-name">Lucas Bonner</div>
                  <div className="testi-title">CEO, SynCore EDU LLC</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-quote">
                What stood out about Ozoemenam from the very beginning was how seriously he took the craft of product management — not just the processes, but the thinking behind every decision. He asked the right questions, pushed back when something didn't serve the user, and delivered consistently across every workstream he touched. I've worked with a lot of PMs. Very few have his combination of commercial instinct and genuine accountability.
              </div>
              <div className="testi-person">
                <div className="testi-avatar">ON</div>
                <div>
                  <div className="testi-name">Obiegbu Nick &amp; Co.</div>
                  <div className="testi-title">HR, Zion Global Limited</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-quote">
                Ozoemenam brought a distinctive analytical mindset to our operations at Su.N Gastronomie — particularly in how he approached our financial data workflows and payment systems. He identified inefficiencies in our transactional reconciliation processes and implemented structured analytical frameworks that measurably improved our reporting accuracy. His background in financial technology was evident from day one. A highly motivated professional who delivers results well beyond the scope of his role.
              </div>
              <div className="testi-person">
                <div className="testi-avatar">NK</div>
                <div>
                  <div className="testi-name">Nikolas Oskas</div>
                  <div className="testi-title">HR · Su.N Gastronomie Betriebs GmbH, Vienna</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="wrap">
          <div className="eyebrow">Experience</div>
          <div className="exp-list">
            {[
              {period:"May 2023 – May 2026",type:"Full-time · Remote",role:"Product Manager & Financial Data Analyst",org:"Zion Global Limited · Abuja, Nigeria",co:"Technology and consulting firm delivering AI-driven products and digital transformation solutions across African and global markets.",bullets:["Delivered 45% revenue uplift within 6 months by executing an AI/ML-informed product roadmap prioritised through rigorous statistical asset tracking and fund metric analysis","Architected advanced data pipelines and SQL-backed automation systems that eliminated corporate operational friction and mitigated transactional reconciliation breaks for enterprise financial clients","Led cross-functional squads (engineering, data science, design) to optimise core portfolio delivery workflows, improving development efficiency by 33% using structured analytical frameworks","Applied NLP-powered behavioural metrics and data-driven iteration methodologies to product systems, boosting portfolio metrics and lifting quantitative NPS scores by 43%","Mentored a high-performing team of 8+ product managers on outcome-driven product analysis and algorithmic financial modelling"]},
              {period:"Jun 2025 – Nov 2025",type:"Part-time · On-site",role:"FinTech Product Analyst & Operations Associate",org:"Su.N Gastronomie Betriebs GmbH · Vienna, Austria",co:"Operational and financial services environment requiring hands-on data analysis and digital payment systems management.",bullets:["Analysed high-volume transactional data, point-of-sale (POS) metrics, and financial workflows to identify operational inefficiencies and product-level improvements","Evaluated digital payment system performance using fintech product analysis frameworks to identify and mitigate transactional reconciliation breaks","Applied accounting controls to inventory tracking and supplier invoicing, producing structured management reporting and KPI monitoring dashboards"]},
              {period:"May 2022 – Apr 2023",type:"Full-time · Remote",role:"Executive Product Manager & Quantitative Finance Analyst",org:"Bostaneastern · Saudi Arabia",co:"Digital transformation and AI solutions firm serving clients across the Middle East and global markets.",bullets:["Negotiated strategic AI vendor partnerships and structured algorithmic execution frameworks that unlocked $10M in new revenue lines","Conducted advanced financial analysis, DCF/LBO portfolio valuations, and risk-adjusted revenue forecasting across a multi-million euro ($50M+) product portfolio","Built and deployed Python-based sentiment analysis models for an automated Voice-of-the-Customer programme, raising core product NPS from +32 to +65","Drove regional digital transformation by integrating automated, SQL-backed quantitative models into corporate decision pipelines, improving execution speed by 40%"]},
              {period:"Oct 2021 – Mar 2022",type:"Full-time · Remote",role:"Product Manager & Data Analytics Strategy Lead",org:"SynCore EDU LLC · United States",co:"US-based education technology company focused on professional development and product management training.",bullets:["Built and coached a team of 8+ product managers, embedding advanced data analysis and fintech product optimisation tools into daily workflows","Executed a data-informed product roadmap resulting in 25% annual revenue growth and launched AI-enhanced features contributing $8M+ in incremental revenue","Designed scalable customer data automation pipelines to optimise user retention and engagement metrics, boosting platform activity by 35%"]},
              {period:"2026 – 2027",type:"Education",role:"BA (Hons) Accounting & Finance",org:"Independent College Dublin, Ireland",co:"",bullets:["9 of 13 ACCA professional exemptions confirmed"]},
              {period:"2024 – 2026",type:"Education",role:"BSc Artificial Intelligence",org:"Johannes Kepler University, Linz, Austria",co:"",bullets:["Machine learning, neural networks, data science, AI ethics, and natural language processing","Applying academic AI/ML knowledge directly to product strategy, intelligent systems design, and financial modelling"]},
              {period:"Jan 2016 – Jun 2021",type:"Education · Nigeria",role:"Higher National Diploma in Accounting",org:"Federal Polytechnic Oko, Anambra State",co:"",bullets:["Financial reporting, cost accounting, management accounting, and audit principles","Foundation in bookkeeping, client account management, and finance operations"]}
            ].map((e,i)=>(
              <div className="exp-row" key={i}>
                <div><div className="ep">{e.period}</div><div className="etype">{e.type}</div></div>
                <div><div className="erole">{e.role}</div><div className="eorg">{e.org}</div>{e.co&&<div className="eco">{e.co}</div>}<ul className="ebuls">{e.bullets.map((b,j)=><li key={j}>{b}</li>)}</ul></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap">
          <div className="eyebrow">Contact</div>
          <div className="contact-cols">
            <div>
              <div className="ch">Open to finance, product, and technology roles — in Dublin or anywhere remote.</div>
              <p className="cb">Dublin-based professional, available now. Whether you have an IFSC role, a fully remote opportunity anywhere in the world, or just want to discuss a project — reach out directly.</p>
              <div className="avail">
                {["Dublin IFSC","Remote · Worldwide","Fintech","Fund Operations","Product Roles"].map(b=>(
                  <div className="abadge" key={b}><span className="adot"/>{b}</div>
                ))}
              </div>
            </div>
            <div className="clinks">
              {[
                ["LinkedIn","linkedin.com/in/ozoemenam-nwaduhu-2a541123a","https://www.linkedin.com/in/ozoemenam-nwaduhu-2a541123a"],
                ["X / Twitter","Global Relocation Guide","https://twitter.com/_AustriaUpdates"],
                ["Email","nwaduhuendurance@gmail.com","mailto:nwaduhuendurance@gmail.com"],
                ["GitHub","github.com/OzzyTe","https://github.com/OzzyTe"],
              ].map(([l,h,url])=>(
                <a
                  href={url}
                  target={url.startsWith("mailto")?"_self":"_blank"}
                  rel="noreferrer"
                  className="clink"
                  key={l}
                  style={{textDecoration:"none"}}
                  onClick={e=>{if(url.startsWith("mailto")){e.preventDefault();window.location.href=url;}}}
                >
                  <span>{l}<br/><span className="clink-h">{h}</span></span>
                  <span style={{fontSize:14,color:C.gold,fontWeight:"bold"}}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="wrap"><div className="footer"><div className="footer-n">Nwaduhu Ozoemenam Endurance</div><div className="footer-c">© 2026 · All rights reserved</div></div></div>
      {btt&&<button className="btt" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>↑</button>}
    </>
  );
}
window.App = App;
window.Portfolio = App;
