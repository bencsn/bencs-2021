import CheckIcon from "../../icons/CheckIcon";
import InfoIcon from "../../icons/InfoIcon";
import { IResumeItem } from "../IResumeItem";

export function ResumeItemComponentForResumePage({
  item,
}: {
  item: IResumeItem;
}) {
  return (
    <div className="border dark:border-ben-dark  py-3 px-6 rounded-lg">
      <h2 className="text-2xl font-bold my-2">{item.name}</h2>
      {item.body &&
        item.body.map((bodyItem, index) => (
          <div key={index} className="my-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{bodyItem.title}</h3>
              <p className="text-sm">{bodyItem.when}</p>
            </div>
            {bodyItem?.link && (
                <a
                    href={bodyItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                >{bodyItem.link}</a>
            )}
            {bodyItem?.description && <div className="text-sm my-2 flex gap-1 items-center">
              <InfoIcon />
              <span>{bodyItem.description}</span>
            </div>}
            <div className="outputs my-2 dark:text-gray-400 text-gray-600">
              {bodyItem.outputs &&
                bodyItem.outputs.map((output, index) => (
                  <div key={index} className="text-sm flex items-start gap-2">
                    <div className="text-green-500">
                      <CheckIcon />
                    </div>{" "}
                    {output}
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}