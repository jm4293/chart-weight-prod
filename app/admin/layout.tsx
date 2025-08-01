interface IProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: IProps) {
  return <>{children}</>;
}
