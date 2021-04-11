import React from 'react';
import Input from '../../atoms/Input/Input';

const UserSettingsForm = () => (
  <>
    <Input label="Imie" id="name" type="text" autocomplete="off" required value="Kamil" />
    <Input label="Nazwisko" id="surname" type="text" autocomplete="off" required value="Kołacz" />
    <Input label="Adres e-mail" id="email" type="email" autocomplete="off" required value="ciastek1996@gmail.com" />
    <Input label="Telefon" id="phone" type="text" autocomplete="off" required value="500156872" />
    <Input label="Hasło" id="password" type="password" autocomplete="off" required />
    <Input label="Powtórz hasło" id="password2" type="password" autocomplete="off" />
    <Input label="NIP" id="nip" type="text" autocomplete="off" value="9690412145" />
  </>
);

export default UserSettingsForm;
