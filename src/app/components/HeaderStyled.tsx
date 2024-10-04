"use client";

import { styled } from "@mui/material";

export const StyledMenu = styled("div")`
  flex: 1;

  * {
    transition: all 0.45s;
    -webkit-transition: all 0.45s;
    font-family: "Roboto", sans-serif;
  }
  .header-nav {
    position: relative;
    float: left;
    margin: 0 auto;
  }
  .header-nav ul {
    position: absolute;
    float: left;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .header-nav ul li {
    position: relative;
    float: left;
  }
  .header-nav ul li ul {
    left: 0px;
  }
  .header-nav > ul {
    position: relative;
  }

  .header-nav > ul > li > .header-nav-link + ul li {
    width: 150px;
    opacity: 0;
    height: 0;
    margin-top: -48px;
    position: relative;
    width: 100%;
  }
  .header-nav > ul > li:hover .header-nav-link + ul > li {
    opacity: 1;
    height: auto;
    margin-top: 0;
  }
  .header-nav .header-nav-link {
    float: left;
    text-decoration: none;
    font-weight: 500;
    font-size: 18px;
    padding: 10px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }
  .header-nav .header-nav-link:hover {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
  }

  .header-nav .header-nav-top-link {
    padding: 0.25rem;
  }

  .header-nav ul li:hover .header-nav-top-link {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
  }

  .header-nav > ul > li > .header-nav-top-link + ul {
    top: 35px;
    margin-top: 15px;
  }

  ${({ theme }) => theme.breakpoints.down(1380)} {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    .header-nav > ul {
      z-index: 20;
    }
    .header-nav > ul > li {
      background-color: white;
      width: 100%;
      border-bottom: 1px solid #8c7a7a;
      flex-direction: column;
      padding-bottom: 0px;
    }
    .header-nav > ul > li:first-child {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    .header-nav > ul > li:last-child {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    .header-nav > ul > li:first-child > a {
      background-color: white;
      font-size: 18px;
      font-weight: 400;
      padding-bottom: 0px;
    }
    .header-nav > ul > li > div > button {
      background-color: white;
      position: absolute;
      right: 10px;
      top: 20px;
    }
    .header-nav > ul > li:last-child {
      background-color: white;
      border-bottom: none;
    }
    .header-nav > ul > li > .header-nav-top-link + ul {
      background-color: white;
      position: relative;
      top: 0px;
      left: 4px;
      width: 100%;
    }
    .header-nav > ul > li > .header-nav-top-link + ul li {
      position: relative;
      float: left;
      border-left: none;
      width: 100%;
    }
  }
`;
