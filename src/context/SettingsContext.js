import React from 'react';

export const SettingsContext = React.createContext({
  selectedFile: null,
  setSelectedFile: () => {},
  values: {},
  currentUser: [],
  username: '',
  Field: null,
  ErrorMessage: null,
});
