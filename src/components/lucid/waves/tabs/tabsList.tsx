import * as Tabs from "./index";

const tabsList = () => {
   return [
      {
         id: "shape",
         label: "Shape",
         content: <Tabs.Shape />,
      },
      {
         id: "colors",
         label: "Colors",
         content: <Tabs.Color />,
      },
      {
         id: "motion",
         label: "Motion",
         content: <Tabs.Motion />,
      },
      // {
      //    id: "view",
      //    label: "View",
      //    content: (
      //       <form>
      //          <fieldset
      //             className={
      //                "fieldset p-2 flex gap-2 border border-white/5 rounded-sm"
      //             }
      //          >
      //             <legend>Position</legend>
      //             <div className="flex gap-2 w-full">
      //                <label className="input w-full!">
      //                   <span className="label">X</span>
      //                   <input
      //                      type="number"
      //                      name="positionY"
      //                      step="1"
      //                      defaultValue={settings.positionX}
      //                      onChange={(e) => {
      //                         setSetting("positionX", e.target.value);
      //                      }}
      //                   />
      //                </label>
      //                <label className="input w-full!">
      //                   <span className="label">Y</span>
      //                   <input
      //                      type="number"
      //                      name="positionY"
      //                      step="1"
      //                      defaultValue={settings.positionY}
      //                      onChange={(e) => {
      //                         setSetting("positionY", e.target.value);
      //                      }}
      //                   />
      //                </label>
      //                <label className="input w-full!">
      //                   <span className="label">Y</span>
      //                   <input
      //                      type="number"
      //                      name="positionZ"
      //                      step="1"
      //                      defaultValue={settings.positionZ}
      //                      onChange={(e) => {
      //                         setSetting("positionZ", e.target.value);
      //                      }}
      //                   />
      //                </label>
      //             </div>
      //          </fieldset>
      //          <fieldset
      //             className={
      //                "fieldset p-2 flex gap-2 border border-white/5 rounded-sm"
      //             }
      //          >
      //             <legend>Rotation</legend>
      //             <div className="flex gap-2 w-full">
      //                <label className="input w-full!">
      //                   <span className="label">X</span>
      //                   <input
      //                      type="number"
      //                      name="rotationX"
      //                      step="1"
      //                      defaultValue={settings.rotationX}
      //                      onChange={(e) => {
      //                         setSetting("rotationX", e.target.value);
      //                      }}
      //                   />
      //                </label>
      //                <label className="input w-full!">
      //                   <span className="label">Y</span>
      //                   <input
      //                      type="number"
      //                      name="rotationY"
      //                      step="1"
      //                      defaultValue={settings.rotationY}
      //                      onChange={(e) => {
      //                         setSetting("rotationY", e.target.value);
      //                      }}
      //                   />
      //                </label>
      //                <label className="input w-full!">
      //                   <span className="label">Y</span>
      //                   <input
      //                      type="number"
      //                      name="rotationZ"
      //                      step="1"
      //                      defaultValue={settings.rotationZ}
      //                      onChange={(e) => {
      //                         setSetting("rotationZ", e.target.value);
      //                      }}
      //                   />
      //                </label>
      //             </div>
      //          </fieldset>
      //       </form>
      //    ),
      // },
   ];
};

export default tabsList;
