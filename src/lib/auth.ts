import axios from "axios";
import config from "./config";
import { useStore } from "@/store/store";
import { User } from "@/types/User";
import request from "./customAxios";

interface AuthUser {
  email: string;
  password: string;
  fillName?: string;
}

class Auth {
  public async login(user: AuthUser): Promise<any> {
    try {
      const response = await axios.post(
        config.getBackendUrl("auth/user/wingman/login"),
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }
  public async signup(user: AuthUser): Promise<any> {
    try {
      const response = await axios.post(
        config.getBackendUrl("auth/user/wingman/createuser"),
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }
  public async loginWithGoogle(token: string): Promise<any> {
    try {
      const response = await axios.post(
        config.getBackendUrl("auth/google/login"),
        { accessToken: token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }

  public async forgotPassword(email: string): Promise<any> {
    try {
      const response = await axios.post(
        config.getBackendUrl("auth/user/wingman/forgotpassword"),
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }

  public async resetPassword(
    password: string,
    accessToken: string
  ): Promise<any> {
    try {
      const response = await axios.post(
        config.getBackendUrl("auth/user/resetpwd"),
        { password, accessToken },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }

  public async checkEmailExists(email: string): Promise<any> {
    try {
      const response = await axios.get(
        config.getBackendUrl(`auth/user/wingman/checkemail?email=${email}`),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }

  public async logout(): Promise<any> {
    try {
      const response = await request({
        url: `auth/logout?accessToken=${useStore.getState().user?.accessToken}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }

  public async updateUser(user: User): Promise<any> {
    try {
      const response = await request({
        url: `auth/updateprofile`,
        method: "POST",
        data: user,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }

  public async updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    try {
      const response = await request({
        url: `auth/changepwd`,
        method: "POST",
        data: {
          oldPassword,
          newPassword,
          accessToken: useStore.getState().user?.accessToken,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }

  public async uploadFile(file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append("inputFile", file);
      formData.append(
        "fileName",
        useStore.getState().user?.fullName?.split(" ").join("_") +
          "_" +
          new Date().getTime() +
          "." +
          file.name.split(".").pop()
      );
      const response = await axios.post(
        "https://api.brdsai.com/brdsai/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/*",
            Authorization: `Bearer ${useStore.getState().user?.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
  }
}

export default new Auth();
