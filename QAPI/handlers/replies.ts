import '../models';
import { Pool } from 'mysql';
import { Response, Request, NextFunction } from 'express';
import {
  get_replies_post,
  get_replies_args,
  insert_post_reply,
  insert_arg_reply,
  insert_reply,
  delete_reply,
  like_reply,
  unlike_reply
} from '../sql/sql';

export function get_post_replies_handler(req: Request<{ id: number }>, res: Response<Array<Replies>>, next: NextFunction, pool: Pool) {
  const PID = req.params.id;
  get_replies_post(PID, pool, (err, replies) => {
    if (err) {
      next(err);
    } else if (!replies) {
      res.status(404).json([]);
    } else {
      res.status(200).json(replies);
    }
  });
}
export function get_arg_replies_handler(req: Request<{ id: number }>, res: Response<Array<Replies>>, next: NextFunction, pool: Pool) {
  const PID = req.params.id;
  get_replies_args(PID, pool, (err, replies) => {
    if (err) {
      next(err);
    } else if (!replies) {
      res.status(404).json([]);
    } else {
      res.status(200).json(replies);
    }
  });
}

export function post_reply_post_handler(req: Request<{ PID: number, reply: Replies }>, res: Response<{ RID: number }>, next: NextFunction, pool: Pool) {
  const reply = req.body.reply;
  const post_id = req.body.PID;
  insert_reply(reply, pool, (err, id) => {
    if (err) {
      next(err);
    } else {
      const transaction_reciept: Replies_to_post = {
        PRID: 0,
        reply: id!,
        post: post_id
      }
      insert_post_reply(transaction_reciept, pool, (err, _) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({ RID: id! });
        }
      });
    }
  });
}

export function post_reply_arg_handler(req: Request<{ AID: number, reply: Replies }>, res: Response<{ RID: number }>, next: NextFunction, pool: Pool) {
  const reply = req.body.reply;
  const arg_id = req.body.AID;
  insert_reply(reply, pool, (err, id) => {
    if (err) {
      next(err);
    } else {
      const transaction_reciept: Replies_to_args = {
        ARID: 0,
        reply: id!,
        arg: arg_id
      }
      insert_arg_reply(transaction_reciept, pool, (err, _) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({ RID: id! });
        }
      });
    }
  });
}

export function delete_reply_handler(req: Request<{ RID: number }>, res: Response<{ deleted: boolean }>, next: NextFunction, pool: Pool) {
  const reply_id = req.body.RID;
  delete_reply(reply_id, pool, (err, isdeleted) => {
    if (err) {
      next(err);
    } else if (!isdeleted) {
      res.status(404).json({ deleted: isdeleted! });
    } else {
      res.status(200).json({ deleted: isdeleted! });
    }
  });
}

export function put_reply_like_handler(req: Request<{ RID: number }>, res: Response<{ liked: boolean }>, next: NextFunction, pool: Pool) {
  const reply_id = req.body.RID;
  like_reply(reply_id, pool, (err, isliked) => {
    if (err) {
      next(err);
    } else if (!isliked) {
      res.status(404).json({ liked: isliked! });
    } else {
      res.status(200).json({ liked: isliked! });
    }
  });
};
export function put_reply_unlike_handler(req: Request<{ RID: number }>, res: Response<{ unliked: boolean }>, next: NextFunction, pool: Pool) {
  const reply_id = req.body.RID;
  unlike_reply(reply_id, pool, (err, isliked) => {
    if (err) {
      next(err);
    } else if (!isliked) {
      res.status(404).json({ unliked: isliked! });
    } else {
      res.status(200).json({ unliked: isliked! });
    }
  });
};
