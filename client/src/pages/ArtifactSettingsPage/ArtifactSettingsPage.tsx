import { useEffect, useState } from "react";
import { Artifact, Collection } from "../../interfaces/Data";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../helpers/api";
import MaterialIcon from "../../common/MaterialIcon";
import { colors } from "../../assets/data/colors";
import IconSelect from "../../common/IconSelect";
import { Icon, icons } from "../../assets/data/icons";
import CollectionCard from "./components/CollectionCard";
import NewCollectionModal from "./components/NewCollectionModal";
import useModal from "../../hooks/useModal";

export default function ArtifactSettingsPage() {
  const { id } = useParams();
  const [artifact, setArtifact] = useState<
    Artifact & { collections: Collection[] }
  >();

  const [newIcon, setNewIcon] = useState<Icon>("e074");
  const [updatedInfo, setUpdatedInfo] = useState<{
    name: string;
    color: string;
    icon: { codepoint: Icon };
  }>({ name: "loading", color: "loading", icon: { codepoint: icons[0] } });

  async function loadData() {
    const artifact = await api.getArtifact(Number(id));
    setArtifact(artifact);
    setUpdatedInfo({
      name: artifact.name,
      color: artifact.color,
      icon: artifact.icon,
    });
    setNewIcon(artifact.icon.codepoint);
  }

  useEffect(() => {
    setUpdatedInfo((i) => {
      return { ...i, icon: { codepoint: newIcon } };
    });
  }, [newIcon]);

  useEffect(() => {
    loadData();
  }, []);

  const modal = useModal();
  const navigate = useNavigate();

  return artifact ? (
    <>
      <section className="p-page my-5 py-5 bg-foreground bg-opacity-10">
        <div className="mb-5">
          <button
            onClick={() => navigate(-1)}
            className="btn-1 px-8 py-2 gap-x-1"
          >
            <MaterialIcon codepoint="e5c4" /> Back
          </button>
        </div>

        <h1 className="font-raleway text-3xl mt-16 mb-8">Basic Info</h1>

        <div className="flex justify-between mx-1 my-6">
          <div className="flex gap-x-2 items-center">
            <h3 className="text-lg">Name</h3>
            <input
              type="text"
              className="border border-front border-opacity-20 p-1 rounded-md text-front text-opacity-80"
              defaultValue={updatedInfo?.name}
            />
          </div>

          <div className="flex gap-x-2 items-center">
            <h3 className="text-lg">Color</h3>
            <select
              name="color"
              className="border border-front border-opacity-30 capitalize px-2 py-1 rounded-md"
              defaultValue={updatedInfo?.color}
            >
              {colors.map((clr) => (
                <option
                  key={clr}
                  value={clr}
                  className="capitalize text-black"
                  style={{ backgroundColor: clr, color: clr }}
                >
                  {clr}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-x-2 items-center">
            <h3 className="text-lg">Icon</h3>
            <IconSelect
              className="border border-front border-opacity-20 p-1 rounded-md text-front text-opacity-80"
              iconState={[newIcon, setNewIcon]}
            />
          </div>

          <button className="btn-2 px-6 py-1">Save Changes</button>
        </div>
      </section>

      <section className="my-10 p-page">
        <h1 className="font-raleway text-3xl mt-16 mb-8">Collections</h1>

        <div className="grid grid-flow-row gap-5 grid-cols-5">
          {artifact.collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              artifactId={artifact.id}
              collection={collection as Collection}
            />
          ))}
          <div className="flex justify-center items-center">
            <button
              className="py-2 px-4 border border-front border-opacity-20 rounded-md"
              onClick={() =>
                modal.show(<NewCollectionModal artifactId={Number(id)} />)
              }
            >
              <MaterialIcon codepoint="e145" className="text-4xl font-light" />
              <p>New Collection</p>
            </button>
          </div>
        </div>
      </section>
    </>
  ) : (
    <article className="h-[80vh] flex items-center justify-center text-2xl font-raleway">
      Loading...
    </article>
  );
}
