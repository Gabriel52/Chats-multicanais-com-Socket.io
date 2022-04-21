import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import { ChannelContextProvider } from "./context/ChannelContext";
import { ChannelCreate } from "./screen/ChannelCreate";
import { ChannelList } from "./screen/ChannelList";
import { Chat } from "./screen/Chat";
import { Login } from "./screen/Login";

ReactDOM.render(
  <React.StrictMode>
    <ChannelContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat/:channelId" element={<Chat />} />
          <Route path="/channels" element={
            <>
              <ChannelCreate />
              <ChannelList />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </ChannelContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
