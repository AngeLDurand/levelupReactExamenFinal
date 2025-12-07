import { useRef } from "react";
import { Link, NavLink, useSearchParams } from "react-router";

export const CustomHeader = () => {
  return (
    <header className="shadow-sm">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <NavLink to={"/"}>
            <img
              src="https://levelup-gamer-assets-prod.s3.us-east-1.amazonaws.com/logoLevelUpTopBarAndroid.webp"
              alt="LevelUp"
              width="70"
              height="40"
            />
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto d-flex gap-2">
              <Link to={"/auth/login"}>Login</Link>
              <Link className="text-danger" to={"/admin"}>
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
