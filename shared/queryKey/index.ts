export const QUERY_KEY = {
  USER: {
    DETAIL: (userId: number) => ['user', userId],
    PATIENT_LIST: (page?: number) =>
      page ? ['patientList', page] : ['patientList'],
    MEMBER_LIST: (page?: number) =>
      page ? ['memberList', page] : ['memberList'],
  },
  WEIGHT: {
    LIST: (page?: number) => (page ? ['weightList', page] : ['weightList']),
  },
};
