
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const blog = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  company: faker.company.companyName(),
  identifier: faker.finance.account(6),
  email: faker.internet.email(),
  status: sample(['active', 'inactive']),
  role: faker.phone.imei()
}));

export default blog;

