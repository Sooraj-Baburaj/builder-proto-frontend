import HomeBanner from "@/components/Home/Banner";

const getIsConnected = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/healthcheck`);
    const isConnected = res.status === 200;
    return isConnected;
  } catch (error) {
    return false;
  }
};

const getTemplates = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/templates`
    );
    const templates = await res.json();
    return templates;
  } catch (error) {
    return {};
  }
};

export default async function Home() {
  const isConnected = await getIsConnected();
  const templates = await getTemplates();

  return (
    <>
      <HomeBanner isConnected={isConnected} templates={templates?.templates} />
    </>
  );
}
