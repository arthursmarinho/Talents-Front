export enum UserType {
  Candidate = "candidate",
  Enterprise = "enterprise",
}

export const userTypeLabel = (type: UserType | string): string => {
  switch (type) {
    case UserType.Candidate:
      return "Candidato";
    case UserType.Enterprise:
      return "Empresa";
    default:
      return "Desconhecido";
  }
};
