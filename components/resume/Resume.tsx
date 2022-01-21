import React from "react";
import { ReactElement, useEffect } from "react";
import { Character } from "./Character";
import { ResumeItem } from "./ResumeItem";
import { IResumeItem } from "./IResumeItem";
const speed = 30;
export const charactorWidth = 32;
export const charactorHeight = 32;
const initialCharactorY = 40;
const initialCharactorX = 0;

export default function Resume() {
  const characterRef = React.useRef<HTMLDivElement>(null);
  const [selectedItems, setSelectedItems] = React.useState<IResumeItem[]>([]);
  const [enableClick, setEnableClick] = React.useState<boolean>(false);

  const items: IResumeItem[] = [
    {
      name: "📚 Education",
      id: "education",
      x: 50,
      y: 100,
    },
    {
      name: "💻 Work in Software Dev",
      id: "work-dev",
      x: 120,
      y: 200,
    },
    {
      name: "🧠 Work in Behavioural Data Science",
      id: "work-data",
      x: 600,
      y: 260,
    },
    {
      name: "🍳 Software Projects",
      id: "dev-projects",
      x: 350,
      y: 350,
    },
    {
      name: "🍳 What I'm good at",
      id: "skills",
      x: 120,
      y: 450,
    },
    {
      name: "💾 View & Download Resume",
      id: "download-view",
      x: 30,
      y: 550,
    },
  ];

  useEffect(() => {
    const setUpCharactorMovement = (e: KeyboardEvent): void => {
      const currentTop = parseInt(
        characterRef.current.style.top.replace("px", "")
      );
      const currentLeft = parseInt(
        characterRef.current.style.left.replace("px", "")
      );

      for (const item of items) {
        if (
          currentLeft + charactorWidth >= item.x &&
          currentTop + charactorHeight >= item.y
        ) {
          setSelectedItems((prev) => Array.from(new Set([...prev, item])));
        }
      }

      if (e.key === "ArrowRight") {
        const isInView = isElementInView(characterRef.current);
        if (isInView) {
          characterRef.current.style.left = `${currentLeft + speed}px`;
        }
      } else if (e.key === "ArrowLeft") {
        const isInView = isElementInView(characterRef.current);
        if (isInView) {
          characterRef.current.style.left = `${currentLeft - speed}px`;
        }
      } else if (e.key === "ArrowUp") {
        const isInView = isElementInView(characterRef.current);
        if (isInView) {
          characterRef.current.style.top = `${currentTop - speed}px`;
        }
      } else if (e.key === "ArrowDown") {
        const isInView = isElementInView(characterRef.current);
        if (isInView) {
          characterRef.current.style.top = `${currentTop + speed}px`;
        }
      }
    };
    document.addEventListener("keydown", setUpCharactorMovement);

    return () => {
      document.removeEventListener("keydown", setUpCharactorMovement);
    };
  }, []);

  function isElementInView(element: HTMLElement) {
    var rect = element.getBoundingClientRect();

    return (
      rect.left >= 0 &&
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function resetCharactorToInitialPositions() {
    characterRef.current.style.top = `${initialCharactorY}px`;
    characterRef.current.style.left = `${initialCharactorX}px`;
  }

  function reset() {
    resetCharactorToInitialPositions();
    setSelectedItems([])
    setEnableClick(false)
  }

  return (
    <div>
      <div className="flex gap-3 items-center justify-start">
        <h2 className="text-3xl font-bold mx-2">
          Build my resume interactively
        </h2>
        <button
          className="button-primary"
          onClick={reset}
        >
          Reset
        </button>
        <div className="flex gap-2 items-center">
          <input
            checked={enableClick}
            onChange={(e) => {
              setEnableClick(e.target.checked);
            }}
            type="checkbox"
            name="enableClick"
            id="enableClick"
          />
          <label htmlFor="enableClick">Enable Click</label>
        </div>
        <button className="button-primary">
          View the pre-built resume instead
        </button>
      </div>
      <div className="description mx-2 my-3 dark:text-gray-400 text-gray-700">
        Use arrow keys (⬅️ ➡️ ⬆️ ⬇️) to move the hand (🖐) around and collect
        resume items.
      </div>

      <div className="w-full h-screen bg-transparent rounded-lg relative">
        <div
          className="absolute animate-bounce transition-all duration-200 ease-in-out"
          style={{
            left: initialCharactorX,
            top: initialCharactorY,
            zIndex: 10,
          }}
          ref={characterRef}
        >
          <Character />
        </div>

        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="absolute"
              style={{
                left: item.x,
                top: item.y,
              }}
              onClick={() => {
                if (enableClick) {
                  setSelectedItems(
                    Array.from(new Set([...selectedItems, item]))
                  );
                }
              }}
            >
              <ResumeItem
                selectedItems={selectedItems}
                name={item.name}
                id={item.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
