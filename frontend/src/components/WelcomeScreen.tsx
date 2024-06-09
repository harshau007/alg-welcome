import React, { useEffect, useState } from "react";
import appicon from "../assets/appicon.png";
import { cn } from "@/lib/utils";
import {
  UpdateSystem,
  ScreenResolution,
  IsLiveISO,
  RunCalamaresIfLiveISO,
  URL,
} from "../../wailsjs/go/main/App";
import "../globals.css";
import moon from "../assets/moon.png";
import sun from "../assets/sun.png";

interface ScreenProps {
  goToScreen: (index: number) => void;
  goBack?: () => void;
  currentScreenIndex?: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isAutoStart: boolean;
  toggleAutoStart: () => void;
}

const WelcomeScreen: React.FC<ScreenProps> = ({
  goToScreen,
  isDarkMode,
  toggleDarkMode,
  isAutoStart,
  toggleAutoStart,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const checkInstallation = async () => {
      const isLive = await IsLiveISO();
      setIsInstalled(isLive);
    };
    checkInstallation();
  }, []);

  const handleInstallALG = async () => {
    try {
      await RunCalamaresIfLiveISO();
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("Failed to install ALG.");
      setModalVisible(true);
    }
  };

  const handleUpdateSystem = async () => {
    setLoading(true);
    try {
      await UpdateSystem();
      setModalTitle("Success");
      setModalMessage("System updated successfully.");
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("Failed to update the system.");
    } finally {
      setLoading(false);
    }
  };

  const handleScreenResolution = async () => {
    try {
      await ScreenResolution();
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("Failed to update screen resolution.");
      setModalVisible(true);
    }
  };

  return (
    <div
      className={`flex flex-col h-full p-6 ${
        isDarkMode ? "bg-[#090E0E] text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex items-center mb-6">
        <img
          src={appicon}
          width={50}
          height={50}
          alt="App Icon"
          className="mr-4"
        />
        <h1 className="text-2xl font-bold">Welcome</h1>
      </div>

      <div className="flex-grow space-y-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Install & Setup</h2>
            {isInstalled ? (
              <button
                onClick={handleInstallALG}
                className={`block w-full py-2 px-4 mb-2 rounded-2xl ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                Install ALG
              </button>
            ) : (
              <button
                onClick={() => URL("https://arkalinuxgui.vercel.app/tutorials")}
                className={`block w-full py-2 px-4 mb-2 rounded-2xl ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                Tutorials
              </button>
            )}
            <button
              onClick={handleScreenResolution}
              className={`block w-full py-2 px-4 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Screen Resolution
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Basic Utilities</h2>
            <button
              onClick={handleUpdateSystem}
              disabled={loading}
              className={`block w-full py-2 px-4 mb-2 rounded-2xl ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Update System
            </button>
            <button
              onClick={() => {
                goToScreen(1);
              }}
              className={`block w-full py-2 px-4 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Update Mirrorlist
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Social Media Links</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => URL("https://github.com/arch-linux-gui")}
              className={`flex-1 py-2 px-4 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              GitHub
            </button>
            <button
              onClick={() => URL("https://discord.gg/NgAFEw9Tkf")}
              className={`flex-1 py-2 px-4 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Discord
            </button>
            <button
              onClick={() => URL("https://x.com/arkalinuxgui")}
              className={`flex-1 py-2 px-4 rounded-2xl ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              X (formerly twitter)
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Get Started</h2>
          <div className="flex items-center justify-between mb-2">
            <span>AutoStart :</span>
            <div
              onClick={toggleAutoStart}
              className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                isAutoStart
                  ? "bg-[#6a45d1]"
                  : isDarkMode
                  ? "bg-gray-600"
                  : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                  isAutoStart ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>Dark Theme :</span>
            <div
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                isDarkMode ? "bg-[#6a45d1]" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                  isDarkMode ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            goToScreen(2);
          }}
          className={`block w-full py-2 px-4 mt-4 rounded-2xl ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          About Us
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
