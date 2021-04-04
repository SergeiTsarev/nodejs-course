import { Router } from 'express';
import { UserService } from '../services/UserService';
import { generateResponseError } from '../utils';
import { User } from '../types/user';
import { validate } from '../middlewares/validation';
import { userSchemas } from '../validation/user.schema';

const router = Router();

router.get('/auto-suggest', validate(userSchemas.autoSuggest, 'query'), (req, res) => {
  const { login = '', limit = 10 } = req.query;
  const autoSuggestedUsers = UserService.getAutoSuggestUsers(String(login), Number(limit));

  return res.json({ users: autoSuggestedUsers });
});

router.get('/:id', validate(userSchemas.userId, 'params'), (req, res) => {
  const { id } = req.params;

  const user = UserService.getUserByID(id);

  if (!user) {
    return generateResponseError(res, 'User with that ID does not exist');
  }

  return res.json({ user });
});

router.post('/', validate(userSchemas.createUpdateUser, 'body'), (req, res) => {
  const { login, password, age } = <User>req.body;

  const user = UserService.addUser({ login, password, age });

  return res.json({ user });
});

router.put(
  '/:id',
  validate(userSchemas.userId, 'params'),
  validate(userSchemas.createUpdateUser, 'body'),
  (req, res) => {
    const { id } = req.params;

    const { login, password, age } = <User>req.body;

    const updatedUser = UserService.updateUser(id, { login, password, age });

    if (!updatedUser) {
      return generateResponseError(res, 'User with that ID does not exist');
    }

    return res.json({ user: updatedUser });
  },
);

router.delete('/:id', validate(userSchemas.userId, 'params'), (req, res) => {
  const { id } = req.params;

  const deletedUser = UserService.deleteUser(id);

  if (!deletedUser) {
    return generateResponseError(res, 'User with that ID does not exist');
  }

  return res.json({ user: deletedUser });
});

export { router as userRouter };
